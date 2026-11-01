import {Switch, Route, Redirect} from 'react-router-dom'

import CartProvider from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <CartProvider>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <Redirect to="/" />
    </Switch>
  </CartProvider>
)

export default App
