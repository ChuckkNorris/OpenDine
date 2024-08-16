import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "modules/app/app.store";
import { openDineApi } from "modules/common/api.client";
import { AutocompleteOption } from "modules/common/models/autocomplete-option.model";
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

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurantOptions: [] as AutocompleteOption[],
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addMatcher(restaurantApiSlice.endpoints.getRestaurants.matchFulfilled, (state, action) => {
      state.restaurantOptions = action.payload?.map(rest => ({ label: `${rest.name} (${rest.restaurantId})`, id: rest.restaurantId }));
    });
  },
});

export const { useGetRestaurantsQuery, useCreateRestaurantMutation } = restaurantApiSlice;
export const selectRestaurantOptions = (state: RootState) => state.restaurants.restaurantOptions;
