import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '~/api/baseQuery';
import { Satellite } from '~/types/satellite';

export const satelliteApi = createApi({
  reducerPath: 'satelliteApi',
  baseQuery,
  tagTypes: ['Satellite'],
  endpoints: (builder) => ({
    getSatellites: builder.query<Satellite[], void>({
      query: () => {
        return {
          url: '/satellites',
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        };
      },
    }),
    createSatellite: builder.mutation<Satellite, { satellite: Satellite }>({
      query: (data) => ({
        url: '/satellites',
        method: 'POST',
        body: data.satellite,
      }),
    }),
    putSatellite: builder.mutation<Satellite, { satellite: Satellite; id: string }>({
      query: (data) => ({
        url: `/satellites/${data.id}`,
        method: 'PUT',
        body: data.satellite,
      }),
    }),
    deleteSatellite: builder.mutation({
      query: (id) => ({
        url: `/satellites/${id}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
});

export const {
  useLazyGetSatellitesQuery,
  useCreateSatelliteMutation,
  usePutSatelliteMutation,
  useDeleteSatelliteMutation,
} = satelliteApi;
