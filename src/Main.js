import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import CusHomeScreenPage from './pages/CusHomeScreenPage'
import CusOrdersPage from './pages/CusOrdersPage'
import CusHeader from './components/CusHeader'
import CusRestaurantsPage from './pages/CusRestaurantsPage'
import CusOrderNowPage from './pages/CusOrderNowPage'
import { Auth } from 'aws-amplify'
import firebase from './firebase'
import ResHomeScreenPage from './pages/ResHomeScreenPage'
import ResOrdersPage from './pages/ResOrdersPage'
import ResHeader from './components/ResHeader'

const Main = () => {
  const [userType, setUserType] = useState('customer')

  const ref = firebase.firestore().collection('users')

  useEffect(() => {
    const getUserType = (Auth) => {
      ref
        .doc(Auth.user.username)
        .get()
        .then((doc) => {
          if (doc.exists && doc.data().userType) {
            setUserType(doc.data().userType)
          } else {
            console.log('No such document!')
            setUserType('customer')
          }
        })
        .catch((error) => {
          console.log('Error getting document in getUserType:', error)
        })
    }

    getUserType(Auth)
  }, [])

  return (
    <Fragment>
      {userType === 'customer' ? (
        <div className='w-100'>
          <Router>
            <CusHeader />
            <main className='py-3'>
              <Container>
                <Route path='/orders' component={CusOrdersPage} />
                <Route path='/restaurants' component={CusRestaurantsPage} />
                <Route
                  path='/ordernow/:restaurant'
                  component={CusOrderNowPage}
                />
                <Route path='/' component={CusHomeScreenPage} exact />
              </Container>
            </main>
          </Router>
        </div>
      ) : (
        <div className='w-100'>
          <Router>
            <ResHeader />
            <main className='py-3'>
              <Container>
                <Route path='/orders' component={ResOrdersPage} />
                <Route path='/' component={ResHomeScreenPage} exact />
              </Container>
            </main>
          </Router>
        </div>
      )}
    </Fragment>
  )
}

export default Main
