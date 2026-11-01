import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CartContext} from '../../context/CartContext'
import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const {history} = props
      const cartCount = cartList.length

      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <nav className="header-container">
          <Link to="/" className="restaurant-link">
            <h1 className="restaurant-name">UNI Resto Cafe</h1>
          </Link>
          <div className="header-actions">
            <p className="my-orders-text">My Orders</p>
            <Link to="/cart" className="cart-link">
              <button type="button" className="cart-button" data-testid="cart">
                Cart
              </button>
              <span className="cart-count">{cartCount}</span>
            </Link>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
