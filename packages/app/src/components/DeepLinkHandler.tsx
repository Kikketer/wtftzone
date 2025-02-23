// https://capacitorjs.com/docs/guides/deep-links#react
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { App, URLOpenListenerEvent } from '@capacitor/app'
import { useSupabase } from './SupabaseProvider'

export const DeepLinkHandler = () => {
  let history = useHistory()
  const { supabase } = useSupabase()

  useEffect(() => {
    App.addListener('appUrlOpen', (_event: URLOpenListenerEvent) => {
      // We get the access_token and potentially the refresh_token from the url:
      const url = new URL(_event.url)
      const params: Record<string, string> | undefined = url.hash
        ?.substring(1)
        ?.split('&')
        ?.reduce((acc: Record<string, string>, s) => {
          acc[s.split('=')[0]] = s.split('=')[1]
          return acc
        }, {})

      const access_token = params?.['access_token'] ?? ''
      const refresh_token = params?.['refresh_token'] ?? ''

      // Only sign in if we got an accessToken with this request
      if (access_token) {
        supabase.auth.setSession({ access_token, refresh_token })
      }

      // Dive deep into the app if we have a specific place we were told to go:
      const slug = url.pathname
      history.push(slug)
      // history.push('/logged')
    })
  }, [])

  return null
}
