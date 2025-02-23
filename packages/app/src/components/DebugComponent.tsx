import { useEffect, useState } from 'react'
import { useSupabase } from './SupabaseProvider'
import { User } from '@supabase/supabase-js'
import { IonButton } from '@ionic/react'

export const DebugComponent = () => {
  const [user, setUser] = useState<User | undefined>()
  const { supabase } = useSupabase()

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.log(error)
    } else {
      setUser(data.user)
    }
  }

  useEffect(() => {
    getUser()
  }, [supabase])

  return (
    <div id="debug">
      <IonButton onClick={() => getUser()}>Reload User</IonButton>
      <h2>Debug Info:</h2>
      <p>User</p>
      <pre>{JSON.stringify(user ?? {}, null, 2)}</pre>
    </div>
  )
}
