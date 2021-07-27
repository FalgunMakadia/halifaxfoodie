import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import firebase from 'firebase'
import { Auth } from 'aws-amplify'
import moment from 'moment'

const OrdersPage = ({ history }) => {
  const orderNowHandler = () => {
    history.push('/restaurants')
  }

  const [userOrders, setUserOrders] = useState([])

  const username = Auth.user.username

  const ref_user_orders = firebase.firestore().collection('user_orders')

  useEffect(() => {
    const getUserOrders = () => {
      let arr = []
      ref_user_orders.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().order_id.split('_')[0] === username.toUpperCase()) {
            arr.push(doc.data())
          } else {
          }
        })
        setUserOrders(arr)
      })
    }
    getUserOrders()
    // eslint-disable-next-line
  }, [])

  return (
    <Container>
      {userOrders.length === 0 ? (
        <div>
          Hey {username.toUpperCase()}, You currently do not have any orders!
          <br />
          <br />
          <p style={{ fontSize: '15px' }}>
            Click the button below to place your first order.
          </p>
        </div>
      ) : (
        <div>
          <div>Hey {username.toUpperCase()}, here are your Orders</div>
          <hr />
          <br />
          <Table
            striped
            bordered
            hover
            variant='dark'
            style={{ fontSize: '18px' }}
          >
            <thead className='my-4'>
              <tr>
                <th>Order ID</th>
                <th>Restaurant</th>
                <th>Order</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id.toUpperCase()}</td>
                  <td>{order.restaurant}</td>
                  <td>{order.order}</td>
                  <td>${order.price}</td>
                  <td>{order.status}</td>
                  <td>{moment(order.time).format('LL')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
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
