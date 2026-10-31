import './index.css'

const DishItem = ({dish, quantity, onIncrease, onDecrease}) => {
  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_currency: dishCurrency,
    dish_calories: dishCalories,
    dish_description: dishDescription,
    dish_image: dishImage,
    dish_Availability: dishAvailability,
    dish_Type: dishType,
    addonCat,
  } = dish

  const hasAddons = Array.isArray(addonCat) && addonCat.length > 0

  const isAvailable =
    dishAvailability === undefined ||
    dishAvailability === true ||
    dishAvailability === 'true'

  const increaseDishQuantity = () => {
    onIncrease(dishId)
  }

  const decreaseDishQuantity = () => {
    if (quantity > 0) {
      onDecrease(dishId)
    }
  }

  return (
    <li className="dish-item">
      <div className="dish-details">
        <div className="dish-title-container">
          <span
            className={`dish-type ${
              dishType === 2 ? 'veg-type' : 'non-veg-type'
            }`}
          >
            {dishType === 2 ? '●' : '◆'}
          </span>

          <h2 className="dish-name">{dishName}</h2>
        </div>

        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>

        <p className="dish-description">{dishDescription}</p>

        <p className="dish-calories">{dishCalories} calories</p>

        {hasAddons && (
          <p className="customizations">Customizations available</p>
        )}

        {isAvailable ? (
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-button"
              onClick={decreaseDishQuantity}
            >
              -
            </button>

            <p className="quantity">{quantity}</p>

            <button
              type="button"
              className="quantity-button"
              onClick={increaseDishQuantity}
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}
      </div>

      <div className="dish-image-container">
        <img src={dishImage} alt={dishName} className="dish-image" />
      </div>
    </li>
  )
}

export default DishItem
