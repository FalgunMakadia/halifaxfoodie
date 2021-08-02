import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { Button } from 'react-bootstrap'
import firebase from 'firebase'

const HomeScreenPage = ({ history }) => {
  const [userType, setUserType] = useState('c')

  const ref = firebase.firestore().collection('users')

  useEffect(() => {
    const getUserType = (Auth) => {
      ref
        .doc(Auth.user.username)
        .get()
        .then((doc) => {
          if (doc.data() && doc.data().userType) {
            if (doc.data().userType === 'restaurant') {
              setUserType('r')
            } else {
              setUserType('c')
            }
          } else {
            console.log('No such document!')
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
        })
    }
    getUserType(Auth)
  })

  const buttonClickHandler = () => {
    history.push('/orders')
  }

  return (
    <div className='d-flex flex-column'>
      <div>
          <h3>
            {Auth.user.username.toUpperCase()}, Welcome to your Account
            (Customer)
          </h3>
          <p>Site is under Development | We apologize for the inconvenience</p>
          <br />
          <div>
            <Button
              style={{
                backgroundColor: '#006400',
                borderColor: '#006400',
                borderRadius: '2px',
              }}
              onClick={buttonClickHandler}
            >
              Orders
            </Button>
          </div>
        </div>
    </div>
  )
}

export default HomeScreenPage

// <div className='w-30 text-right m-auto'>
//         <AmplifySignOut />
//       </div>
