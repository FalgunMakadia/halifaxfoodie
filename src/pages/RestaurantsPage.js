import React from 'react'
import { ListGroup, Row, Col, Card, Button } from 'react-bootstrap'

const RestaurantsPage = ({ history }) => {
  const restaurant1 = {
    name: 'Snappy Tomato',
    desc: 'Italian Restaurant',
    status: true,
  }
  const restaurant2 = {
    name: 'Tim Hortons',
    desc: 'Cafe',
    status: true,
  }
  const restaurant3 = {
    name: 'Swaad',
    desc: 'Indian Restaurant',
    status: true,
  }

  const orderFromRestaurantHandler = (restaurant) => {
    history.push(`/ordernow/${restaurant}`)
  }

  return (
    <div>
      <h3>Restaurants</h3>
      <hr />
      <div className='d-flex flex-row justify-content-between flex-wrap'>
        <Card style={{ width: '18rem', fontSize: '15px' }} className='my-3'>
          <Row>
            <Col>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{restaurant1.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>{restaurant1.desc}</ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Status:{' '}
                      {restaurant1.status === true
                        ? 'Restaurant Open'
                        : 'Restaurant Closed'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={() => orderFromRestaurantHandler(restaurant1.name)}
                    disabled={restaurant1.status === false}
                    style={{
                      backgroundColor: '#006400',
                      borderColor: '#006400',
                      borderRadius: '2px',
                    }}
                  >
                    {restaurant1.status === false
                      ? 'Restaurant Closed'
                      : 'Order Now'}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card>

        <Card style={{ width: '18rem', fontSize: '15px' }} className='my-3'>
          <Row>
            <Col>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{restaurant2.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>{restaurant2.desc}</ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Status:{' '}
                      {restaurant2.status === true
                        ? 'Restaurant Open'
                        : 'Restaurant Closed'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={() => orderFromRestaurantHandler(restaurant2.name)}
                    disabled={restaurant2.status === false}
                    style={{
                      backgroundColor: '#006400',
                      borderColor: '#006400',
                      borderRadius: '2px',
                    }}
                  >
                    {restaurant2.status === false
                      ? 'Restaurant Closed'
                      : 'Order Now'}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card>

        <Card style={{ width: '18rem', fontSize: '15px' }} className='my-3'>
          <Row>
            <Col>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{restaurant3.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>{restaurant3.desc}</ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Status:{' '}
                      {restaurant3.status === true
                        ? 'Restaurant Open'
                        : 'Restaurant Closed'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={() => orderFromRestaurantHandler(restaurant3.name)}
                    disabled={restaurant3.status === false}
                    style={{
                      backgroundColor: '#006400',
                      borderColor: '#006400',
                      borderRadius: '2px',
                    }}
                  >
                    {restaurant3.status === false
                      ? 'Restaurant Closed'
                      : 'Order Now'}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}

export default RestaurantsPage
