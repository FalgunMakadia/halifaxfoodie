import React, { useEffect, useState } from 'react'
import { ListGroup, Row, Col, Card, Button } from 'react-bootstrap'
import firebase from 'firebase'

const RestaurantsPage = ({ history }) => {
  const [restaurantList, setRestaurantList] = useState([])

  const ref_restaurants = firebase.firestore().collection('restaurants')

  useEffect(() => {
    const getRestaurants = () => {
      let arr = []
      ref_restaurants.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arr.push(doc.data())
        })
        console.log(arr)
        setRestaurantList(arr)
      })
    }
    getRestaurants()
  }, [])

  const orderFromRestaurantHandler = (restaurant) => {
    history.push(`/ordernow/${restaurant}`)
  }

  return (
    <div>
      <h3>Restaurants</h3>
      <hr />
      <div className='d-flex flex-row justify-content-between flex-wrap'>
        {restaurantList.map((restaurant) => (
          <Card style={{ width: '18rem', fontSize: '15px' }} className='my-3'>
            <Row>
              <Col>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{restaurant.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>{restaurant.desc}</ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:{' '}
                        {restaurant.status === true
                          ? 'Restaurant Open'
                          : 'Restaurant Closed'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={() =>
                        orderFromRestaurantHandler(restaurant.name)
                      }
                      disabled={restaurant.status === false}
                      style={{
                        backgroundColor: '#006400',
                        borderColor: '#006400',
                        borderRadius: '2px',
                      }}
                    >
                      {restaurant.status === false
                        ? 'Restaurant Closed'
                        : 'Order Now'}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RestaurantsPage
