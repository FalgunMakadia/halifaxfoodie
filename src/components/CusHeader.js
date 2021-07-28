import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()

  const signOutButtonClickHandler = () => {
    localStorage.clear()
    history.push('/')
    window.location.reload(false)
  }

  const goToRestaurantsHandler = () => {
    history.push('/restaurants')
  }

  const goToOrdersHandler = () => {
    history.push('/orders')
  }

  const chatBot = () => {
    history.push('/chatbot')
  }

  return (
    <header style={{ position: 'fixed', top: '0', right: '0', left: '0' }}>
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        className='justify-content-between'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <p
                style={{ letterSpacing: '4px', fontFamily: 'ui-monospace' }}
                className='my-auto'
              >
                HALIFAX FOODIE
              </p>
            </Navbar.Brand>
          </LinkContainer>
          <Nav>
            <Nav.Link
              className='m-auto'
              onClick={chatBot}
              style={{
                fontFamily: 'ui-monospace',
                fontSize: '15px',
              }}
            >
              CHAT WITH BOT
            </Nav.Link>
            <Nav.Link
              className='m-auto'
              onClick={goToOrdersHandler}
              style={{
                fontFamily: 'ui-monospace',
                fontSize: '15px',
              }}
            >
              ORDERS
            </Nav.Link>
            <Nav.Link
              className='m-auto'
              onClick={goToRestaurantsHandler}
              style={{
                fontFamily: 'ui-monospace',
                fontSize: '15px',
              }}
            >
              RESTAURANTS
            </Nav.Link>
            <Nav.Link
              className='m-auto'
              onClick={signOutButtonClickHandler}
              style={{
                fontFamily: 'ui-monospace',
                fontSize: '15px',
              }}
            >
              SIGN OUT
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

// <Button
//               className='btn btn-primary'
//               onClick={signOutButtonClickHandler}
//             >
//               Sign Out
//             </Button>
