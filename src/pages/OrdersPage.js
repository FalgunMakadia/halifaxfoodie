import React from 'react'
import { Button, Container } from 'react-bootstrap'

const OrdersPage = ({ history }) => {
  const orderNowHandler = () => {
    history.push('/restaurants')
  }

  return (
    <Container>
      <div>You currently do not have any orders!</div>
      <br />
      <div>
        <Button
          onClick={orderNowHandler}
          style={{
            backgroundColor: '#006400',
            borderColor: '#006400',
            borderRadius: '2px',
          }}
        >
          Order Now
        </Button>
      </div>
    </Container>
  )
}

export default OrdersPage
