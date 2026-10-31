import './index.css'

const Header = ({restaurantName, cartCount}) => (
  <header className="header">
    <div className="header-content">
      <h1 className="restaurant-name">{restaurantName}</h1>

      <div className="cart-container">
        <span className="my-orders">My Orders</span>

        <button type="button" className="cart-button" aria-label="cart">
          🛒
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </div>
  </header>
)

export default Header
