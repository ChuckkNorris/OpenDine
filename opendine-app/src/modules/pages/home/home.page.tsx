import RestaurantsGrid from 'modules/restaurants/restaurants-grid.component';
import { useLoaderData } from 'react-router-dom';
import * as restaurantsService from 'modules/restaurants/restaurants.service';
import { RestaurantDto } from 'modules/restaurants/models/restaurant.model';

export const restaurantLoader = async () => {
  return restaurantsService.getRestaurants();
}

const HomePage = () => {
  return (
    <div>
      Home!
    </div>
  );
}

export default HomePage;
