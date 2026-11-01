import {Component, createContext} from 'react'

export const CartContext = createContext(undefined)

class CartProvider extends Component {
  state = {
    cartList: [],
  }

  addCartItem = dish => {
    this.setState(prevState => {
      const isItemAlreadyExist = prevState.cartList.find(
        eachItem => eachItem.dishId === dish.dishId,
      )

      if (isItemAlreadyExist) {
        return {
          cartList: prevState.cartList.map(eachItem =>
            eachItem.dishId === dish.dishId
              ? {...eachItem, quantity: eachItem.quantity + 1}
              : eachItem,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, {...dish, quantity: 1}],
      }
    })
  }

  removeCartItem = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachItem => eachItem.dishId !== dishId,
      ),
    }))
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem =>
        eachItem.dishId === dishId
          ? {...eachItem, quantity: eachItem.quantity + 1}
          : eachItem,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(eachItem =>
          eachItem.dishId === dishId
            ? {...eachItem, quantity: eachItem.quantity - 1}
            : eachItem,
        )
        .filter(eachItem => eachItem.quantity > 0),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    const {children} = this.props

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        {children}
      </CartContext.Provider>
    )
  }
}

export default CartProvider
