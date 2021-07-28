import React from 'react'
import { AmplifyChatbot } from '@aws-amplify/ui-react'

const ChatBot = () => {
  return (
    <div style={{ fontSize: '14px' }}>
      <AmplifyChatbot botName='HalifaxFoodieSApp' />
    </div>
  )
}

export default ChatBot
