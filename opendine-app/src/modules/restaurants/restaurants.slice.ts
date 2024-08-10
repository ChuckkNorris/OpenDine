import { openDineApi } from "modules/common/api.client";
import { RestaurantDto } from "modules/restaurants/models/restaurant.model";

export interface CreateRestaurantRequestDto {
  name: string;
  description: string;
}

export interface CreateRestaurantResponseDto {
  restaurantId: number;
}

export const restaurantApiSlice = openDineApi.injectEndpoints({
  endpoints: (build) => ({
    getRestaurants: build.query<RestaurantDto[], void>({
      query: () => ({ url: '/restaurants', method: 'get' }), //'restaurants',
      // providesTags: ['Post'],
    }),
    createRestaurant: build.mutation<CreateRestaurantResponseDto[], CreateRestaurantRequestDto>({
      query: () => ({ url: '/restaurants', method: 'post' }), //'restaurants',
      // providesTags: ['Post'],
    }),
    // query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
    // mutation: build.mutation({
    //   query: () => ({ url: '/mutation', method: 'post' }),
    // }),
  }),
});

export const { useGetRestaurantsQuery, useCreateRestaurantMutation } = restaurantApiSlice;
