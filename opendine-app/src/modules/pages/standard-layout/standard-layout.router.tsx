import App from "modules/app/app.component";
import { getRestaurants } from "modules/restaurants/restaurants.service";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { NotFoundPage } from "modules/pages/not-found.page";
import HomePage from "modules/pages/home.page";

const Error = () => <div>Something went wrong</div>;

export const standardLayoutRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    loader: async () => {
      return getRestaurants()
    },
    // children: [
    //   {
    //     path: "team",
    //     element: <HomePage />,
    //   },
    // ],
  },
]);

export default standardLayoutRouter
