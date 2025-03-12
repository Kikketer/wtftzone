import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { DebugComponent } from '../components/DebugComponent'
import { useSupabase } from '../components/SupabaseProvider'
import { useHistory } from 'react-router-dom'

export const LoggedIn = () => {
  const history = useHistory()
  const { supabase } = useSupabase()

  // This works, but feels wrong:
  // useEffect(() => {
  //   closeBrowser().catch(() => {
  //     // nom nom nom
  //   })
  // }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    history.push('/')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Logged In</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={signOut}>Sign Out</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Logged in</IonTitle>
          </IonToolbar>
        </IonHeader>
        <DebugComponent />
      </IonContent>
    </IonPage>
  )
}
