import { configureStore, Store } from '@reduxjs/toolkit/react';
import selectedCardsReducer from './selectedCardsSlice';

export const makeStore = (): Store =>
  configureStore({
    reducer: {
      selectedCards: selectedCardsReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
