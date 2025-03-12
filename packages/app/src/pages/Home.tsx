import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import LoginComponent from '../components/LoginComponent'
import './Home.css'
import { DebugComponent } from '../components/DebugComponent'

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Auth Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Auth Test</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LoginComponent />
      </IonContent>
    </IonPage>
  )
}

export default Home
