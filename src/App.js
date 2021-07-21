import logo from './logo.svg'
import './App.css'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { useEffect } from 'react'
import firebase from './firebase'

const ref = firebase.firestore().collection('users')

function App() {
  const addOrUpdateUserToFirestore = () => {
    const user = {
      username: Auth.user.username,
      email: Auth.user.attributes.email,
      phone: Auth.user.attributes.phone_number,
      answer1: null,
      answer2: null,
    }
    ref
      .doc(Auth.user.username)
      .set(user)
      .then(() => {
        console.log('Firebase User operation success')
      })
      .catch((err) => {
        console.error('Error in addUserToFirestore: ' + err)
      })
  }

  useEffect(() => {
    console.log(Auth)
    addOrUpdateUserToFirestore()
  })

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h3>Welcome to your Account</h3>
        <p>Site is under Development | We apologize for the inconvenience</p>
        <AmplifySignOut />
      </header>
    </div>
  )
}

export default withAuthenticator(App)
