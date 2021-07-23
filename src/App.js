import './App.css'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { useEffect } from 'react'
import SecurityQuestions from './SecurityQuestions'
import firebase from 'firebase'
import { addUserToFirestore } from './utils/firebaseUtils'

const ref = firebase.firestore().collection('users')

function App() {
  useEffect(() => {
    ref
      .doc(Auth.user.username)
      .get()
      .then((doc) => {
        if (!doc.data()) {
          addUserToFirestore(Auth)
        } else {
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  })

  return (
    <div className='App'>
      <header className='App-header'>
        <SecurityQuestions />
      </header>
    </div>
  )
}

export default withAuthenticator(App)
