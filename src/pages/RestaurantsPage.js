import React from 'react'
import { ListGroup, Row, Col, Card, Button } from 'react-bootstrap'

const RestaurantsPage = () => {
  const restaurant1 = {
    name: 'Snappy Tomato',
    desc: 'Italian Restaurant',
    status: false,
  }
  const restaurant2 = {
    name: 'Tim Horton',
    desc: 'Cafe',
    status: true,
  }
  const restaurant3 = {
    name: 'Swaad',
    desc: 'Indian Restaurant',
    status: true,
  }

  const orderFromRestaurantHandler = () => {
    alert('Open Res')
  }

  return (
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
                  onClick={orderFromRestaurantHandler}
                  disabled={restaurant1.status === false}
                  style={{
                    backgroundColor: '#006400',
                    borderColor: '#006400',
                    borderRadius: '2px',
                  }}
                >
                  Order
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
                  onClick={orderFromRestaurantHandler}
                  disabled={restaurant2.status === false}
                  style={{
                    backgroundColor: '#006400',
                    borderColor: '#006400',
                    borderRadius: '2px',
                  }}
                >
                  Order
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
                  onClick={orderFromRestaurantHandler}
                  disabled={restaurant3.status === false}
                  style={{
                    backgroundColor: '#006400',
                    borderColor: '#006400',
                    borderRadius: '2px',
                  }}
                >
                  Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default RestaurantsPage
