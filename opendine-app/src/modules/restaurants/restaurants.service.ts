import axiosClient from "modules/common/axios.client";
import { RestaurantDto } from "modules/restaurants/models/restaurant.model";

export const getRestaurants = async (): Promise<RestaurantDto[]> => {
  const response = await axiosClient.get("/restaurants");
  return response.data;
}