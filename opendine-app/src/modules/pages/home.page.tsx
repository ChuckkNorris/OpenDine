import RestaurantsGrid from 'modules/restaurants/restaurants-grid.component';
import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import * as restaurantsService from 'modules/restaurants/restaurants.service';
import { Restaurant } from 'modules/restaurants/models/restaurant.model';

export const restaurantLoader = async () => {
  return restaurantsService.getRestaurants();
}

const HomePage = () => {
  const restaurants = useLoaderData() as Restaurant[];
  return (
    <div>
      Home!
      <RestaurantsGrid restaurants={restaurants} />
    </div>
  );
}

export default HomePage;
