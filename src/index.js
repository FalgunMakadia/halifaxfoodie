import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

Amplify.configure({
  Interactions: {
    bots: {
      HalifaxFoodieSApp: {
        name: 'HalifaxFoodieSApp',
        alias: '$LATEST',
        region: 'us-east-1',
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
