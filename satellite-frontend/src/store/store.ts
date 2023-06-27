import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';

import { apiMiddleware } from '~/api/middleware';
import { apiReducers } from '~/api/reducers';
import { satelliteSlice } from '~/store/slices/satellite';

export const store = configureStore({
  reducer: combineReducers({
    satellite: satelliteSlice.reducer,
    ...apiReducers,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiMiddleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
