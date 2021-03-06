import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import firebase from 'firebase'
import { Button } from 'react-bootstrap'
import { updateRestaurantState } from '../utils/firebaseUtils'

const ResHomeScreenPage = () => {
  const username = Auth.user.username

  const [restaurantStatus, setRestaurantStatus] = useState(null)

  const lowerCaseResName = username.replace('_', ' ')

  const ref_restaurants = firebase.firestore().collection('restaurants')

  const openRestaurant = () => {
    updateRestaurantState(Auth, true)
    setRestaurantStatus(true)
  }

  const closeRestaurant = () => {
    updateRestaurantState(Auth, false)
    setRestaurantStatus(false)
  }

  useEffect(() => {
    const getRestaurantStatus = () => {
      ref_restaurants
        .doc(lowerCaseResName)
        .get()
        .then((doc) => {
          if (doc.data() && doc.data().status) {
            if (doc.data().status === true) {
              setRestaurantStatus(true)
            } else {
              setRestaurantStatus(false)
            }
          } else {
            console.log('No such document!')
          }
        })
        .catch(function (error) {
          console.error('Error Marking Order as Delivered: ', error)
        })
    }
    getRestaurantStatus()
  }, [])

  return (
    <div>
      <h2>Welcome {lowerCaseResName.toUpperCase()}</h2>
      <div>
        {restaurantStatus ? (
          <div>
            <p>Your Restaurant is Open</p>
            <div>
              <Button
                onClick={closeRestaurant}
                style={{
                  backgroundColor: '#E74C3C',
                  borderColor: '#E74C3C',
                  borderRadius: '2px',
                }}
              >
                Close Restaurant
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p>Your Restaurant is Closed</p>
            <div>
              <Button
                onClick={openRestaurant}
                style={{
                  backgroundColor: '#27AE60',
                  borderColor: '#27AE60',
                  borderRadius: '2px',
                }}
              >
                Open Restaurant
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResHomeScreenPage
