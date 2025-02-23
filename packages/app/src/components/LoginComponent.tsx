import './LoginComponent.css'
import { IonButton } from '@ionic/react'
import { useSupabase } from './SupabaseProvider'

const baseUrl = import.meta.env.VITE_BASE_URL

const LoginComponent = () => {
  const { supabase } = useSupabase()

  const login = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/logged`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }

  return (
    <div id="login">
      <IonButton onClick={login}>Log In with Google</IonButton>
    </div>
  )
}

export default LoginComponent
