import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  const [visibleAlert, setAlertVisible] = useState(false)

  const handleVisible = () => {
    setAlertVisible(true)
    setTimeout(() => {
      setAlertVisible(false)
    }, 3000)
  }

  useEffect(() => {
    handleVisible()
  }, [])

  return (
    <Alert show={visibleAlert} variant={variant}>
      {children}
    </Alert>
  )
}
Message.defaultProps = {
  variant: 'info',
}

export default Message
