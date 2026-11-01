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
