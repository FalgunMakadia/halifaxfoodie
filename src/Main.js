import React from 'react'
import logo from './logo.svg'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'

const Main = () => {
  return (
    <div className='d-flex flex-column'>
      <img src={logo} className='App-logo' alt='logo' />
      <br />
      <h3>{Auth.user.username.toUpperCase()}, Welcome to your Account</h3>
      <p>Site is under Development | We apologize for the inconvenience</p>
      <br />
      <div className='w-30 text-right m-auto'>
        <AmplifySignOut />
      </div>
    </div>
  )
}

export default Main
