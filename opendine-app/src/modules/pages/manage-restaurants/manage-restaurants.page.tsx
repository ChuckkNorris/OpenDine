import RestaurantsGrid from 'modules/restaurants/restaurants-grid.component';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import * as restaurantsService from 'modules/restaurants/restaurants.service';
import { RestaurantDto } from 'modules/restaurants/models/restaurant.model';
import { Autocomplete, TextField } from '@mui/material';
import 'modules/pages/manage-restaurants/manage-restaurants.page.css';

export const restaurantLoader = async () => {
  return restaurantsService.getRestaurants();
}

const ManageRestaurantsPage = () => {

  const restaurants = useLoaderData() as RestaurantDto[];
  const {restaurantId} = useParams();
  

  const options = restaurants.map(rest => ({ label: rest.name, value: rest.name}));
  const defaultVal = options[0];
  const defaultValQueryString = { label: '', value: restaurantId };

  return (
    <div>
      <h1>My Restaurants</h1>
      {/* disablePortal */}
      <Autocomplete
        className='center-align'
        defaultValue={defaultValQueryString}
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
 