import { configureStore } from '@reduxjs/toolkit/react';
import { apiSlice } from '../services/narutoApi';
import charactersReducer from './charactersSlice';
import selectedCardsReducer from './selectedCardsSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    selectedCards: selectedCardsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
