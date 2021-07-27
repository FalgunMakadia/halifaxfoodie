import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import firebase from 'firebase'
import { Auth } from 'aws-amplify'
import moment from 'moment'
import Message from '../components/Message'

const ResOrdersPage = () => {
  const [userOrders, setUserOrders] = useState([])
  const [orderStatus, setOrderStatus] = useState('Order Placed')
  const [msg, setMsg] = useState('')

  const ref_user_orders = firebase.firestore().collection('user_orders')

  const capitalize = (user_name) => {
    var splitStr = user_name.toLowerCase().split(' ')
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
  }

  const markAsDelivered = (orderId) => {
    ref_user_orders
      .doc(orderId)
      .update({ status: 'Delivered' })
      .then(() => {
        console.log('Order Marked as Delivered!')
        setOrderStatus(orderId + ' Delivered')
        setMsg(orderId + ' Delivered')
      })
      .catch(function (error) {
        console.error('Error Marking Order as Delivered: ', error)
      })
  }

  const username = capitalize(Auth.user.username.replace('_', ' '))
  console.log(username)

  const getCustomerUsername = (order_id) => {
    return order_id.split('_')[0]
  }

  useEffect(() => {
    const getAllOrders = () => {
      let arr = []
      ref_user_orders
        .where('restaurant', '==', username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data())
          })
          console.log(arr)
          setUserOrders(arr)
        })
    }
    getAllOrders()
    // eslint-disable-next-line
  }, [orderStatus, msg])

  return (
    <Container>
      {userOrders.length === 0 ? (
        <div>
          Hey {username.toUpperCase()}, You currently do not have any orders!
        </div>
      ) : (
        <div>
          {msg && (
            <Message varient='success'>Order marked as Delivered</Message>
          )}
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
                <th>Customer</th>
                <th>Order</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Order Date and Time</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {userOrders
                .sort((a, b) => a.time - b.time)
                .map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id.toUpperCase()}</td>
                    <td>{getCustomerUsername(order.order_id).toUpperCase()}</td>
                    <td>{order.order}</td>
                    <td>${order.price}</td>
                    <td>{order.status}</td>
                    <td>{moment(order.time).format('LLL')}</td>
                    <td>
                      <Button
                        onClick={() => markAsDelivered(order.order_id)}
                        disabled={order.status === 'Delivered'}
                        style={{
                          backgroundColor: '#006400',
                          borderColor: '#006400',
                          borderRadius: '2px',
                        }}
                      >
                        {order.status === 'Delivered'
                          ? 'Delivered'
                          : 'Mark as Delivered'}
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
      <br />
    </Container>
  )
}

export default ResOrdersPage
