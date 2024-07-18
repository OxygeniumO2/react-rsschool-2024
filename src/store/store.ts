import { configureStore } from '@reduxjs/toolkit/react';
import { apiSlice } from '../services/narutoApi';
import charactersReducer from './charactersSlice';

export default configureStore({
  reducer: {
    characters: charactersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
