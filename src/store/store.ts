import { configureStore } from '@reduxjs/toolkit/react';
import { apiSlice } from '../services/narutoApi';
import selectedCardsReducer from './selectedCardsSlice';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
