import RestaurantsGrid from 'modules/restaurants/restaurants-grid.component';
import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import * as restaurantsService from 'modules/restaurants/restaurants.service';
import { Restaurant } from 'modules/restaurants/models/restaurant.model';
import StandardLayoutNavigation from 'modules/pages/standard-layout/standard-layout.navigation';

export const restaurantLoader = async () => {
  return restaurantsService.getRestaurants();
}

const ManageRestaurantsPage = () => {
  const restaurants = useLoaderData() as Restaurant[];
  return (
    <div>
      Restaurants!
      <RestaurantsGrid restaurants={restaurants} />
    </div>
  );
}

export default ManageRestaurantsPage;
