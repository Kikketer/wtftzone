import './LoginComponent.css'
import { IonButton } from '@ionic/react'
import { useSupabase } from './SupabaseProvider'
import { openBrowser } from '../nativeBrowser'

const baseUrl = import.meta.env.VITE_BASE_URL

const LoginComponent = () => {
  const { supabase } = useSupabase()

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/logged`,
        // Skip the Browser Redirect to manually open the browser
        skipBrowserRedirect: true,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error(error)
      return
    }

    await openBrowser(data.url)
  }

  return (
    <div id="login">
      <IonButton onClick={login}>Log In with Google</IonButton>
    </div>
  )
}

export default LoginComponent
