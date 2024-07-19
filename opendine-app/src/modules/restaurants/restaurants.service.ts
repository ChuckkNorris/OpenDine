import axiosClient from "modules/common/axios.client";

export const getRestaurants = async (): Promise<any[]> => {
  const response = await axiosClient.get("/restaurants");
  return response.data;
}