import { getRestaurants } from "modules/restaurants/restaurants.service";
import {
  createBrowserRouter,
} from "react-router-dom";
import { NotFoundPage } from "modules/pages/not-found/not-found.page";
import HomePage from "modules/pages/home/home.page";
import ManageRestaurantsPage from "modules/pages/manage-restaurants/manage-restaurants.page";
import StandardLayout from "modules/app/standard-layout/standard-layout.component";

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
        path: "restaurants",
        element: <ManageRestaurantsPage />,
        errorElement: <NotFoundPage />,
        loader: async () => {
          return getRestaurants()
        },
        children: [
          {
            path: ":restaurantId",
            element: <HomePage/>
          }
        ]
      },
    ],
  },
]);

export default standardLayoutRouter
