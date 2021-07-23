import logo from './logo.svg'
import './App.css'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth, Hub } from 'aws-amplify'
import { useEffect, useState } from 'react'

function App() {
  const initFormState = {
    username: '',
    password: '',
    email: '',
    authCode: '',
    formType: 'signUp',
  }

  const [formState, setFormState] = useState(initFormState)
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkUser()
    setAuthListener()
  })

  const checkUser = async () => {
    try {
      const user = Auth.currentAuthenticatedUser()
      setUser(user)
    } catch (error) {
      setUser(null)
    }
  }

  const onChange = (e) => {
    e.persist()
    setFormState(() => ({ ...formState, [e.target.name]: e.target.value }))
  }

  const { formType } = formState

  return (
    <div className='App'>
      {formType === 'signUp' && (
        <div>
          <input name='username' onChange={onChange} placeholder='Username' />
          <input
            name='password'
            type='password'
            onChange={onChange}
            placeholder='Password'
          />
          <input name='email' onChange={onChange} placeholder='email' />
          <button>Sign Up</button>
        </div>
      )}
      {formType === 'signIn' && (
        <div>
          <input name='username' onChange={onChange} placeholder='Username' />
          <input
            name='password'
            type='password'
            onChange={onChange}
            placeholder='Password'
          />
          <button>Sign In</button>
        </div>
      )}
      {formType === 'confirmSignUp' && (
        <div>
          <input
            name='authCode'
            onChange={onChange}
            placeholder='Confirmation Code'
          />
          <button>Sign In</button>
        </div>
      )}
      {formType === 'confirmSignUp' && <h1>Hello World!</h1>}
      {/* Change Here */}
    </div>
  )
}

export default withAuthenticator(App)
