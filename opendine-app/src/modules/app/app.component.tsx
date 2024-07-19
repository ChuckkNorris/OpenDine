import React, { useEffect } from 'react';
import logo from '../../logo.svg';
import './app.component.css';
import * as restaurantService from 'modules/restaurants/restaurants.service';
import { RouterProvider, useLoaderData } from 'react-router-dom';
import {SnackbarProvider} from 'notistack';
import StandardLayout from 'modules/pages/standard-layout/standard-layout.component';
import standardLayoutRouter from 'modules/pages/standard-layout/standard-layout.router';


function App() {
  // const restaurants = useLoaderData();
  // console.warn("Loader data", restaurants);
  // const [restaurants, setRestaurants] = React.useState<any[]>([]);
  // useEffect(() => {
  //   restaurantService.getRestaurants().then((data) => {
  //     console.warn("DATA", data);
  //     setRestaurants(data);
  // })}, []);
  return (
    
    // Notistack provider to stack toast notifications programatically
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} onClose={() => 'Error'}>
      {/* Custom component to enqueue toast messages when observed in state */}
      {/* <NotificationHandler> */}
        {/* Primary set of page routes that compose application */}
        
        <StandardLayout />
      {/* </NotificationHandler> */}
    </SnackbarProvider>
  );
}

export default App;
