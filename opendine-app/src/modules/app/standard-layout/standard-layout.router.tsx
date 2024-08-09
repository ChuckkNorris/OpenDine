import { getRestaurants } from "modules/restaurants/restaurants.service";
import {
  createBrowserRouter, redirect,
} from "react-router-dom";
import { NotFoundPage } from "modules/pages/not-found/not-found.page";
import HomePage from "modules/pages/home/home.page";
import ManageRestaurantsPage from "modules/pages/manage-restaurants/manage-restaurants.page";
import StandardLayout from "modules/app/standard-layout/standard-layout.component";
import openDineApi, { useGetRestaurantsQuery } from "modules/common/api.client";
import { store } from "modules/app/app.store";

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
          const p = store.dispatch(openDineApi.endpoints.getRestaurants.initiate());

          try {
            const response = await p.unwrap()
            return response
          } catch (e) {
            console.error(e);
            // see https://reactrouter.com/en/main/fetch/redirect
            return redirect("/");
          } finally {
            p.unsubscribe()
          }
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
