import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const AskQuestions = ({ history }) => {
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')

  const submitHandler = () => {
    alert(answer1 + answer2)
    history.goBack()
  }
  return (
    <div>
      <Card className='px-3' style={{ width: '22rem', marginTop: '2rem' }}>
        <Card.Body>
          <h3 className='p-3'>Security Questions</h3>
          <hr />
          <Form className='text-start' onSubmit={submitHandler}>
            <div className='mt-4'>
              <h6>What is your favourite color?</h6>
              <Form.Group>
                <Form.Control
                  type='text'
                  placeholder='Enter your answer'
                  value={answer1}
                  onChange={(e) => setAnswer1(e.target.value)}
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
                />
              </Form.Group>
            </div>
            <br />
            <hr />
            <div className='text-center'>
              <Button type='submit' className='m-2 px-5 btn-primary'>
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AskQuestions

// <div className='error'>{emailError}</div>
// <div className='error'>{passwordError}</div>
