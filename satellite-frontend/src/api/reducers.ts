import { satelliteApi } from '~/api/satellite';

export const apiReducers = {
  [satelliteApi.reducerPath]: satelliteApi.reducer,
};
