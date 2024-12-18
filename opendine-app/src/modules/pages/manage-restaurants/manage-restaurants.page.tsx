import RestaurantsGrid from 'modules/restaurants/restaurants-grid.component';
import { Outlet, redirect, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import * as restaurantsService from 'modules/restaurants/restaurants.service';
import { RestaurantDto } from 'modules/restaurants/models/restaurant.model';
import { Autocomplete, TextField } from '@mui/material';
import 'modules/pages/manage-restaurants/manage-restaurants.page.css';
// import { useGetRestaurantsQuery } from 'modules/common/api.client';
import { selectRestaurantOptions, useGetRestaurantsQuery } from 'modules/restaurants/restaurants.slice';
import { useAppSelector } from 'modules/common/redux.hooks';

export const restaurantLoader = async () => {
  return restaurantsService.getRestaurants();
}

const ManageRestaurantsPage = () => {
  useGetRestaurantsQuery();
  const restaurants = useLoaderData() as RestaurantDto[];
  const {restaurantId} = useParams();
  const navigate = useNavigate();
  const restaurantOptions = useAppSelector(selectRestaurantOptions);
  
  // const options = restaurants?.map(rest => ({ label: `${rest.name} (${rest.restaurantId})`, id: rest.restaurantId}));
  // const defaultVal = options?.[0];
  const defaultOption = restaurantId
    ? restaurantOptions.find(opt => opt.id === +restaurantId)
    : undefined; //options?.[0];
  // const defaultValQueryString = restaurantId ? { label: '', value: restaurantId } : undefined;

  return (
    <div>
      <h1>My Restaurants</h1>
      {/* disablePortal */}
      <Autocomplete
        className='center-align'
        defaultValue={defaultOption}
        options={restaurantOptions}
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
 