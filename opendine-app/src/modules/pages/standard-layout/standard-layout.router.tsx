import { getRestaurants } from "modules/restaurants/restaurants.service";
import {
  createBrowserRouter, redirect,
} from "react-router-dom";
import { NotFoundPage } from "modules/pages/not-found/not-found.page";
import HomePage from "modules/pages/home/home.page";
import ManageRestaurantsPage from "modules/pages/manage-restaurants/manage-restaurants.page";
import StandardLayout from "modules/pages/standard-layout/standard-layout.component";
import { restaurantApiSlice } from "modules/restaurants/restaurants.slice";
import { store } from "modules/app/app.store";
import { createLoaderQuery } from "modules/common/api.client";

const Error = () => <div>Something went wrong</div>;

export const standardLayoutRouter = createBrowserRouter([
  {
    // Layout route with Outlet for current child page
    path: "/",
    element: <StandardLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        id: "Home",
        path: "/", 
        element: <HomePage />,
      },
      {
        id: "Restaurants",
        path: 'restaurants',
        element: <ManageRestaurantsPage />,
        errorElement: <NotFoundPage />,
        loader: createLoaderQuery(() => store.dispatch(restaurantApiSlice.endpoints.getRestaurants.initiate())),
        // children: [
        //   {
        //     path: ":restaurantId",
        //     element: <ManageRestaurantsPage/>
        //   }
        // ]
      },
      {
        // id: "",
        path: 'login',
        element: <div>Login Page</div>,
        errorElement: <NotFoundPage />,
        // loader: createLoaderQuery(() => store.dispatch(restaurantApiSlice.endpoints.getRestaurants.initiate())),
        // children: [
        //   {
        //     path: ":restaurantId",
        //     element: <ManageRestaurantsPage/>
        //   }
        // ]
      },
      // {
      //   path: "restaurants/:restaurantId",
      //   element: <ManageRestaurantsPage />,
      //   loader: createLoaderQuery(() => store.dispatch(openDineApi.endpoints.getRestaurants.initiate())),
      // }
    ],
  },
]);

export default standardLayoutRouter
