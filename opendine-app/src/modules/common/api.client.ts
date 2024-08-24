// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import { getEnvironmentConfig } from 'modules/common/environment.config';
import type { ApiEndpointQuery, BaseQueryFn, QueryDefinition } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { RestaurantDto } from 'modules/restaurants/models/restaurant.model';
import { getRestaurants } from 'modules/restaurants/restaurants.service';
import { store } from 'modules/app/app.store';
import { useMsal } from '@azure/msal-react';
import { getIdToken } from 'modules/app/auth/auth.helpers';

const env = getEnvironmentConfig();

const axiosBaseQuery =
  (
    { baseUrl, defaultHeaders  }: { baseUrl: string, defaultHeaders?: AxiosRequestConfig['headers'] } = { baseUrl: '', defaultHeaders: {} }
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
      const idToken = await getIdToken();
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {'Authorization': `Bearer ${idToken}`, ...headers},
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
    baseUrl: env.REACT_APP_API_BASE_URL,
    defaultHeaders: {
      // 'Authorization': useMsal().instance.getActiveAccount()?.idToken
    }
    // defaultHeaders: {
    //   'Authorization': `Bearer ${store.getState().auth.token}`
    // }
  }),
  endpoints: (build) => ({
    // getRestaurants: build.query<RestaurantDto[], void>({
    //   query: () => ({ url: '/restaurants', method: 'get' }), //'restaurants',
    //   // providesTags: ['Post'],
    // }),
    // createRestaurant: build.mutation<CreateRestaurantResponseDto[], CreateRestaurantRequestDto>({
    //   query: () => ({ url: '/restaurants', method: 'post' }), //'restaurants',
    //   // providesTags: ['Post'],
    // }),
    // query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
    // mutation: build.mutation({
    //   query: () => ({ url: '/mutation', method: 'post' }),
    // }),
  }),
});

// export const { useGetRestaurantsQuery, useCreateRestaurantMutation } = openDineApi;

// @ts-ignore
export const createLoaderQuery = (query: Function<any>) => async () => {
  const p = query();
  // const p = store.dispatch(openDineApi.endpoints.getRestaurants.initiate());
  try {
    const response = await p.unwrap()
    return response
  } catch (e) {
    console.error(e);
    // see https://reactrouter.com/en/main/fetch/redirect
    // return redirect("/");
  } finally {
    p.unsubscribe()
  }
}
