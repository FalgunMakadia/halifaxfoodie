import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreenPage from './pages/HomeScreenPage'
import OrdersPage from './pages/OrdersPage'
import Header from './components/Header'
import RestaurantsPage from './pages/RestaurantsPage'
import OrderNowPage from './pages/OrderNowPage'

const Main = () => {
  return (
    <div className='w-100'>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/orders' component={OrdersPage} />
            <Route path='/restaurants' component={RestaurantsPage} />
            <Route path='/ordernow/:restaurant' component={OrderNowPage} />
            <Route path='/' component={HomeScreenPage} exact />
          </Container>
        </main>
      </Router>
    </div>
  )
}

export default Main
