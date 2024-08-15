import { configureStore } from '@reduxjs/toolkit/react';
import formReducer from './formsSlice';

export const store = configureStore({
  reducer: {
    formData: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
