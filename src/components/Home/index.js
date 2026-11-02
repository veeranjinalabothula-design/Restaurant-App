import {Component} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    restaurantName: '',
    menuCategories: [],
    activeMenuCategoryId: '',
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getUpdatedDish = dish => ({
    dishId: dish.dish_id,
    dishName: dish.dish_name,
    dishPrice: dish.dish_price,
    dishCurrency: dish.dish_currency,
    dishCalories: dish.dish_calories,
    dishDescription: dish.dish_description,
    dishImage: dish.dish_image,
    dishAvailability: dish.dish_Availability,
    addonCat: dish.addonCat,
  })

  getRestaurantDetails = async () => {
    const apiUrl =
      'https://apis.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(apiUrl)
    const data = await response.json()

    const updatedData = data[0].table_menu_list.map(eachCategory => ({
      menuCategoryId: eachCategory.menu_category_id,
      menuCategory: eachCategory.menu_category,
      categoryDishes: eachCategory.category_dishes.map(eachDish =>
        this.getUpdatedDish(eachDish),
      ),
    }))

    this.setState({
      isLoading: false,
      restaurantName: data[0].restaurant_name,
      menuCategories: updatedData,
      activeMenuCategoryId: updatedData[0].menuCategoryId,
    })
  }

  setActiveMenuCategoryId = menuCategoryId => {
    this.setState({activeMenuCategoryId: menuCategoryId})
  }

  renderDishes = () => {
    const {menuCategories, activeMenuCategoryId} = this.state
    const activeCategory = menuCategories.find(
      eachCategory => eachCategory.menuCategoryId === activeMenuCategoryId,
    )

    return (
      <ul className="dishes-list">
        {activeCategory.categoryDishes.map(eachDish => (
          <DishItem key={eachDish.dishId} dishDetails={eachDish} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, restaurantName, menuCategories} = this.state

    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="restaurant-heading">{restaurantName}</h1>
          <ul className="menu-categories-list">
            {menuCategories.map(eachCategory => (
              <li key={eachCategory.menuCategoryId}>
                <button
                  type="button"
                  className="category-button"
                  onClick={() =>
                    this.setActiveMenuCategoryId(eachCategory.menuCategoryId)
                  }
                >
                  {eachCategory.menuCategory}
                </button>
              </li>
            ))}
          </ul>
          {isLoading ? <p>Loading...</p> : this.renderDishes()}
        </div>
      </>
    )
  }
}

export default Home
