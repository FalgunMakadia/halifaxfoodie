import React, { useState, useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import { addOrUpdateUserToFirestore } from './utils/firebaseUtils'
import firebase from 'firebase'
import Main from './Main'
import './App.css'

const SecurityQuestions = () => {
  const [success, setSuccess] = useState(false)
  const [page, setPage] = useState('login')
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')

  const ref = firebase.firestore().collection('users')

  useEffect(() => {
    const ifSecurityAnswersExist = () => {
      ref
        .doc(Auth.user.username)
        .get()
        .then((doc) => {
          if (doc.data() && doc.data().answer1.length !== 0) {
            setPage('login')
          } else {
            setPage('register')
            console.log('No such document or Register Page!')
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
        })
    }

    ifSecurityAnswersExist()
  }, [ref])

  const checkSecurityAnswer = (answer1, answer2) => {
    ref
      .doc(Auth.user.username)
      .get()
      .then((doc) => {
        if (doc.exists) {
          var ans1 = doc.data().answer1
          var ans2 = doc.data().answer2
          if (answer1 === ans1 || answer2 === ans2) {
            setSuccess(true)
          } else {
            alert('Incorrect Security Answer')
          }
        } else {
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  }

  const registerSubmitHandler = (e) => {
    e.preventDefault()
    var userType = ''
    if (document.getElementById('restaurant').checked)
      userType = document.getElementById('restaurant').value
    if (document.getElementById('customer').checked)
      userType = document.getElementById('customer').value
    addOrUpdateUserToFirestore(
      Auth,
      answer1.toLowerCase(),
      answer2.toLowerCase(),
      userType
    )
    setSuccess(true)
  }

  const loginSubmitHandler = (e) => {
    e.preventDefault()
    checkSecurityAnswer(answer1.toLowerCase(), answer2.toLowerCase())
  }

  return (
    <div>
      {success ? (
        <Main />
      ) : page === 'register' ? (
        <div style={{ color: 'black' }}>
          <Card
            className='px-2 mt-2'
            style={{ width: '22rem', marginTop: '2rem' }}
          >
            <Card.Body>
              <h3 className='p-3'>Additional Information</h3>
              <hr />
              <Form className='text-start' onSubmit={registerSubmitHandler}>
                <h6>Who are you?</h6>
                <div
                  style={{ fontSize: '16px' }}
                  className='d-flex flex-row justify-content-around'
                >
                  <Form.Check
                    label='Customer'
                    type='radio'
                    id='customer'
                    name='user-type'
                    value='customer'
                    defaultChecked
                  />
                  <Form.Check
                    label='Restaurant'
                    type='radio'
                    id='restaurant'
                    name='user-type'
                    value='restaurant'
                  />
                </div>
                <div className='my-4'>
                  <h6>What is your favourite color?</h6>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      placeholder='Enter your answer'
                      value={answer1}
                      onChange={(e) => setAnswer1(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <br />
                  <h6>What is your dream job?</h6>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      placeholder='Enter your answer'
                      value={answer2}
                      onChange={(e) => setAnswer2(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <hr />
                <div className='text-center'>
                  <Button
                    type='submit'
                    className='m-2 px-5 py-2 btn-primary'
                    style={{
                      backgroundColor: '#006400',
                      borderColor: '#006400',
                      borderRadius: '0px',
                      fontSize: '15px',
                    }}
                  >
                    <b>SUBMIT</b>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div style={{ color: 'black' }}>
          <Card
            className='px-2 mt-2'
            style={{ width: '22rem', marginTop: '2rem' }}
          >
            <Card.Body>
              <h3 className='p-3'>Answer Security Question</h3>
              <hr />
              <Form className='text-start' onSubmit={loginSubmitHandler}>
                <div className='mt-4'>
                  {Auth.user.username.length % 2 === 0 ? (
                    <div>
                      <h6>What is your favourite color?</h6>
                      <Form.Group>
                        <Form.Control
                          type='text'
                          placeholder='Enter your answer'
                          value={answer1}
                          onChange={(e) => setAnswer1(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </div>
                  ) : (
                    <div>
                      <h6>What is your dream job?</h6>
                      <Form.Group>
                        <Form.Control
                          type='text'
                          placeholder='Enter your answer'
                          value={answer2}
                          onChange={(e) => setAnswer2(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </div>
                  )}
                </div>
                <br />
                <hr />
                <div className='text-center'>
                  <Button
                    type='submit'
                    className='m-2 px-5 py-2 btn-primary'
                    style={{
                      backgroundColor: '#006400',
                      borderColor: '#006400',
                      borderRadius: '0px',
                      fontSize: '15px',
                    }}
                  >
                    <b>SUBMIT</b>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  )
}

export default SecurityQuestions
