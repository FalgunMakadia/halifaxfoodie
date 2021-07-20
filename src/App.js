import logo from './logo.svg'
import './App.css'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h3>Welcome to your Account.</h3>
        <p>Site is under Development | We apologize for the inconvenience</p>
        <AmplifySignOut />
      </header>
    </div>
  )
}

export default withAuthenticator(App)