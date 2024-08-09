// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import { getEnvironmentConfig } from 'modules/common/environment.config';
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { RestaurantDto } from 'modules/restaurants/models/restaurant.model';
import { getRestaurants } from 'modules/restaurants/restaurants.service';

const env = getEnvironmentConfig();

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export interface CreateRestaurantRequestDto {
  name: string;
  description: string;
}

export interface CreateRestaurantResponseDto {
  restaurantId: number;
}

export const openDineApi = createApi({
  
  baseQuery: axiosBaseQuery({
    baseUrl:env.REACT_APP_API_BASE_URL,
  }),
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

export const { useGetRestaurantsQuery, useCreateRestaurantMutation } = openDineApi;


// export const openDineApi = createApi({
//   reducerPath: 'openDineApi',
//   baseQuery: fetchBaseQuery({ baseUrl: env.REACT_APP_API_BASE_URL }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query<Pokemon, string>({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// });

export default openDineApi;
