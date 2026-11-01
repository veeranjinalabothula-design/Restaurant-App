import {CartContext} from '../../context/CartContext'
import Header from '../Header'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      } = value

      return (
        <>
          <Header />
          {cartList.length === 0 ? (
            <div className="cart-empty-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="empty cart"
                className="cart-empty-image"
              />
              <h1>Your cart is empty</h1>
            </div>
          ) : (
            <div className="cart-container">
              <h1>Cart</h1>
              <button type="button" onClick={removeAllCartItems}>
                Remove All
              </button>
              <ul className="cart-items-list">
                {cartList.map(eachItem => (
                  <li className="cart-item" key={eachItem.dishId}>
                    <img
                      src={eachItem.dishImage}
                      alt={eachItem.dishName}
                      className="cart-item-image"
                    />
                    <div>
                      <h1>{eachItem.dishName}</h1>
                      <p>
                        {eachItem.dishCurrency}{' '}
                        {eachItem.dishPrice * eachItem.quantity}
                      </p>
                      <div className="cart-quantity-container">
                        <button
                          type="button"
                          onClick={() =>
                            decrementCartItemQuantity(eachItem.dishId)
                          }
                        >
                          -
                        </button>
                        <p>{eachItem.quantity}</p>
                        <button
                          type="button"
                          onClick={() =>
                            incrementCartItemQuantity(eachItem.dishId)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCartItem(eachItem.dishId)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
