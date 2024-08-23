import { QueryDefinition } from "@reduxjs/toolkit/query";
import axiosClient from "modules/common/axios.client";
import { RestaurantDto } from "modules/restaurants/models/restaurant.model";

export const getRestaurants = async (): Promise<RestaurantDto[]> => {
  const response = await axiosClient.get("/restaurants");
  return response.data;
}

// export const getRestaurantsTest = async (): QueryDefinition => {
//   createLoaderQuery(() => store.dispatch(openDineApi.endpoints.getRestaurants.initiate()))
// }
