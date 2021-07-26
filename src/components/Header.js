import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  const signOutButtonClickHandler = () => {
    localStorage.clear()
    window.location.reload(false)
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
