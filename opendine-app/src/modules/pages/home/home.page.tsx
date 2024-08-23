import RestaurantsGrid from 'modules/restaurants/restaurants-grid.component';
import { useLoaderData } from 'react-router-dom';
import * as restaurantsService from 'modules/restaurants/restaurants.service';
import { RestaurantDto } from 'modules/restaurants/models/restaurant.model';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from 'modules/app/auth/auth.config';
import { Button } from '@mui/material';

export const restaurantLoader = async () => {
  return restaurantsService.getRestaurants();
}

const HomePage = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
      instance
          .loginRedirect({
              ...loginRequest,
              prompt: 'create',
          })
          .catch((error) => console.log(error));
  };
  
  return (
    <div>

      <h1>Home!</h1>
      <div className="App">
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <div>{Object.values(activeAccount?.idTokenClaims ?? {}).map(val => (<h3>{val as string}</h3>))}</div>
                ) : null}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Button className="signInButton" onClick={handleRedirect}>
                    Sign up
                </Button>
            </UnauthenticatedTemplate>
        </div>
    </div>
  );
}

export default HomePage;
