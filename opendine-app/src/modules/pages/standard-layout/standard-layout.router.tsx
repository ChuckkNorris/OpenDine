import { getRestaurants } from "modules/restaurants/restaurants.service";
import {
  createBrowserRouter,
} from "react-router-dom";
import { NotFoundPage } from "modules/pages/not-found.page";
import HomePage from "modules/pages/home.page";
import ManageRestaurantsPage from "modules/pages/manage-restaurants.page";
import StandardLayout from "modules/pages/standard-layout/standard-layout.component";

const Error = () => <div>Something went wrong</div>;

export const standardLayoutRouter = createBrowserRouter([
  {
    path: "/",
    element: <StandardLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        id: "Home",
        path: "/",
        element: <HomePage />,
        loader: async () => {
          return getRestaurants()
        },
      },
      // {
      //   id: "Restaurants",
      //   path: "/restaurants",
      //   element: <ManageRestaurantsPage />,
      //   errorElement: <NotFoundPage />,
      //   loader: async () => {
      //     return getRestaurants()
      //   },
      // },
      {
        id: "Restaurants",
        path: "restaurants",
        element: <StandardLayout />,
        errorElement: <NotFoundPage />,
        loader: async () => {
          return getRestaurants()
        },
        children: [
          {
            path: "neat",
            element: <ManageRestaurantsPage />,
            errorElement: <NotFoundPage />,
            children: [
              {
                id: "Awesome",
                path: "awesome",
                element: <HomePage />,
                loader: async () => {
                  return getRestaurants()
                },
              },
            ]
          }
        ]
      }
    ],
  },
  // {
  //   id: "Restaurants",
  //   path: "/restaurants",
  //   element: <ManageRestaurantsPage />,
  //   errorElement: <NotFoundPage />,
  //   loader: async () => {
  //     return getRestaurants()
  //   },
  // },
  // {
  //   path: "/restaurants",
  //   element: <ManageRestaurantsPage />,
  //   errorElement: <NotFoundPage />,
  //   loader: async () => {
  //     return getRestaurants()
  //   },
  // }
]);

export default standardLayoutRouter
