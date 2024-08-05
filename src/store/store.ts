import { configureStore, Store } from '@reduxjs/toolkit/react';
import { apiSlice } from '../services/narutoApi';
import selectedCardsReducer from './selectedCardsSlice';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = (): Store =>
  configureStore({
    reducer: {
      selectedCards: selectedCardsReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export const wrapper = createWrapper<ReturnType<typeof makeStore>>(makeStore);
