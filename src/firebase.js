import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDTnVrhJHyZe4j0_B_JfnjCsWbM4xEN-_Y',
  authDomain: 'csci5410-serverless.firebaseapp.com',
  projectId: 'csci5410-serverless',
  storageBucket: 'csci5410-serverless.appspot.com',
  messagingSenderId: '37716784030',
  appId: '1:37716784030:web:cbecdc2d247a27a86b9c8f',
}

firebase.initializeApp(firebaseConfig)

export default firebase
