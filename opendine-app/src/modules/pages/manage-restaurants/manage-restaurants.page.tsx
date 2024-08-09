import RestaurantsGrid from 'modules/restaurants/restaurants-grid.component';
import { Outlet, redirect, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import * as restaurantsService from 'modules/restaurants/restaurants.service';
import { RestaurantDto } from 'modules/restaurants/models/restaurant.model';
import { Autocomplete, TextField } from '@mui/material';
import 'modules/pages/manage-restaurants/manage-restaurants.page.css';
import { useGetRestaurantsQuery } from 'modules/common/api.client';

export const restaurantLoader = async () => {
  return restaurantsService.getRestaurants();
}

const ManageRestaurantsPage = () => {
  const restaurants = useLoaderData() as RestaurantDto[];
  const {restaurantId} = useParams();
  const navigate = useNavigate();
  
  console.log('Restaurants: ', restaurants);
  const options = restaurants?.map(rest => ({ label: `${rest.name} (${rest.restaurantId})`, id: rest.restaurantId}));
  // const defaultVal = options?.[0];
  const defaultOption = restaurantId
    ? options.find(opt => opt.id === +restaurantId)
    : undefined; //options?.[0];
  // const defaultValQueryString = restaurantId ? { label: '', value: restaurantId } : undefined;

  return (
    <div>
      <h1>My Restaurants</h1>
      {/* disablePortal */}
      <Autocomplete
        className='center-align'
        defaultValue={defaultOption}
        options={options}
        sx={{ width: 300 }}
        onChange={(e: any, newValue) => navigate(`/restaurants/${newValue?.id}`, { replace: true })}
        renderInput={(params) => <TextField {...params} label="Select Restaurant" />}
      />
      
      <Outlet />
      <RestaurantsGrid restaurants={restaurants} />
    </div>
  );
}

export default ManageRestaurantsPage;
 