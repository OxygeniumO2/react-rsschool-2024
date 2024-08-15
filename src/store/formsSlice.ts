import { createSlice } from '@reduxjs/toolkit';
import { countriesData } from '../constants/countries';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordMatch: string;
  gender: string;
  terms: boolean;
  pic: string;
  country: string;
}

export interface FormsState {
  uncontrolledFormData: FormData[];
  reactHookFormData: FormData[];
  countries: string[];
}

const initialState: FormsState = {
  uncontrolledFormData: [],
  reactHookFormData: [],
  countries: countriesData,
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  selectors: {
    getUncontrolledFormData: (state) => {
      state.uncontrolledFormData;
    },
    getReactHookFormData: (state) => {
      state.reactHookFormData;
    },
    getCountries: (state) => {
      state.countries;
    },
  },
  reducers: {
    setUncontrolledFormData(state, action) {
      state.uncontrolledFormData = [
        action.payload,
        ...state.uncontrolledFormData,
      ];
    },
    setReactHookFormData(state, action) {
      state.reactHookFormData = [action.payload, ...state.reactHookFormData];
    },
  },
});

export const { setUncontrolledFormData, setReactHookFormData } =
  formsSlice.actions;
export default formsSlice.reducer;
