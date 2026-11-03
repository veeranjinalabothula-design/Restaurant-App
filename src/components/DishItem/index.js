import {CartContext} from '../../context/CartContext'
import './index.css'

const DishItem = props => {
  const {dishDetails} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishImage,
    dishAvailability,
    addonCat,
  } = dishDetails

  const hasAddons = Array.isArray(addonCat) && addonCat.length > 0

  return (
    <CartContext.Consumer>
      {value => {
        const {
          cartList,
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const cartItem = cartList.find(each => each.dishId === dishId)
        const quantity = cartItem === undefined ? 0 : cartItem.quantity

        const onClickIncrease = () => {
          if (quantity === 0) {
            addCartItem(dishDetails)
          } else {
            incrementCartItemQuantity(dishId)
          }
        }

        const onClickDecrease = () => {
          if (quantity > 0) {
            decrementCartItemQuantity(dishId)
          }
        }

        return (
          <li className="dish-item">
            <div className="dish-details">
              <h1 className="dish-name">{dishName}</h1>
              <p className="dish-price">
                {dishCurrency} {dishPrice}
              </p>
              <p className="dish-description">{dishDescription}</p>
              <p className="dish-calories">{dishCalories} calories</p>
              {hasAddons && <p>Customizations available</p>}

              {dishAvailability ? (
                <>
                  <div className="quantity-container">
                    <button type="button" onClick={onClickDecrease}>
                      -
                    </button>
                    <p className="dish-quantity">{quantity}</p>
                    <button type="button" onClick={onClickIncrease}>
                      +
                    </button>
                  </div>
                  {quantity > 0 && (
                    <button
                      type="button"
                      className="add-to-cart-button"
                      onClick={() => {
                        if (cartItem === undefined) {
                          addCartItem(dishDetails)
                        }
                      }}
                    >
                      ADD TO CART
                    </button>
                  )}
                </>
              ) : (
                <p>Not available</p>
              )}
            </div>
            <img src={dishImage} alt={dishName} className="dish-image" />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
