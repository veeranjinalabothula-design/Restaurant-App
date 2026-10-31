import {useEffect, useState} from 'react'

import Header from '../Header'
import DishItem from '../DishItem'

import './index.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const Home = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [menuList, setMenuList] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setCartItems] = useState({})

  const getRestaurantData = async () => {
    try {
      setIsLoading(true)

      const response = await fetch(API_URL)
      const data = await response.json()

      const restaurant = Array.isArray(data) ? data[0] : data

      const categories = restaurant.table_menu_list || []

      setRestaurantName(restaurant.restaurant_name || '')
      setMenuList(categories)

      if (categories.length > 0) {
        setActiveCategoryId(categories[0].menu_category_id)
      }
    } catch (error) {
      setRestaurantName('')
      setMenuList([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRestaurantData()
  }, [])

  const getCartCount = () =>
    Object.values(cartItems).reduce((total, quantity) => total + quantity, 0)

  const increaseQuantity = dishId => {
    setCartItems(previousItems => ({
      ...previousItems,
      [dishId]: (previousItems[dishId] || 0) + 1,
    }))
  }

  const decreaseQuantity = dishId => {
    setCartItems(previousItems => {
      const currentQuantity = previousItems[dishId] || 0

      if (currentQuantity <= 1) {
        const updatedItems = {...previousItems}
        delete updatedItems[dishId]
        return updatedItems
      }

      return {
        ...previousItems,
        [dishId]: currentQuantity - 1,
      }
    })
  }

  const getActiveDishes = () => {
    const activeCategory = menuList.find(
      category => category.menu_category_id === activeCategoryId,
    )

    if (!activeCategory) {
      return []
    }

    return activeCategory.category_dishes || []
  }

  const renderTabs = () => (
    <ul className="tabs-container">
      {menuList.map(category => {
        const isActive = category.menu_category_id === activeCategoryId

        return (
          <li key={category.menu_category_id} className="tab-item">
            <button
              type="button"
              className={`tab-button ${isActive ? 'active-tab' : ''}`}
              onClick={() => setActiveCategoryId(category.menu_category_id)}
            >
              {category.menu_category}
            </button>
          </li>
        )
      })}
    </ul>
  )

  const renderDishes = () => {
    const dishes = getActiveDishes()

    return (
      <ul className="dishes-list">
        {dishes.map(dish => (
          <DishItem
            key={dish.dish_id}
            dish={dish}
            quantity={cartItems[dish.dish_id] || 0}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />
        ))}
      </ul>
    )
  }

  if (isLoading) {
    return (
      <div className="loader-container" data-testid="loader">
        <p className="loader">Loading...</p>
      </div>
    )
  }

  return (
    <div className="restaurant-app">
      <Header restaurantName={restaurantName} cartCount={getCartCount()} />

      <main className="main-container">
        {renderTabs()}

        <section className="dishes-container">{renderDishes()}</section>
      </main>
    </div>
  )
}

export default Home
