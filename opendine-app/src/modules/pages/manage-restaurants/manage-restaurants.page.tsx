import RestaurantsGrid from 'modules/restaurants/restaurants-grid.component';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import * as restaurantsService from 'modules/restaurants/restaurants.service';
import { RestaurantDto } from 'modules/restaurants/models/restaurant.model';
import { Autocomplete, TextField } from '@mui/material';
import 'modules/pages/manage-restaurants/manage-restaurants.page.css';
import { useGetRestaurantsQuery } from 'modules/common/api.client';

export const restaurantLoader = async () => {
  return restaurantsService.getRestaurants();
}

const ManageRestaurantsPage = () => {

  // const {data, ...rest} = useGetRestaurantsQuery() as any;
  // console.warn('Request: ', data, rest);
  const restaurants = useLoaderData() as RestaurantDto[];
  const {restaurantId} = useParams();
  
  console.log('Restaurants: ', restaurants);
  const options = restaurants?.map(rest => ({ label: `${rest.name} (${rest.restaurantId})`, value: rest.restaurantId}));
  // const defaultVal = options?.[0];
  // const defaultValQueryString = restaurantId || defaultVal?.value ? { label: '', value: restaurantId ?? defaultVal?.value } : undefined;

  return (
    <div>
      <h1>My Restaurants</h1>
      {/* disablePortal */}
      <Autocomplete
        className='center-align'
        defaultValue={options?.[0]}
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Restaurant" />}
      />
      
      <Outlet />
      <RestaurantsGrid restaurants={restaurants} />
    </div>
  );
}

export default ManageRestaurantsPage;
 