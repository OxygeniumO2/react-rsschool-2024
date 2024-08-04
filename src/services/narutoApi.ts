import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DEFAULT_NUMBER_OF_ITEMS } from '../constants/constants';
import baseUrl from './baseUrl';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store/store';
import { Action, PayloadAction } from '@reduxjs/toolkit/react';

export interface GetCharacters {
  name?: string;
  page?: number;
  limit?: number;
}
export interface GetCharactersResp {
  characters: Character[];
  currentPage: number;
  pageSize: number;
  total: number;
}

export interface Character {
  id: string;
  name: string;
  images: string[];
  debut: {
    appearsIn?: string;
  };
  personal: {
    sex?: string;
    clan?: string;
    classification?: string | string[];
  };
}

export interface HandleCharactersDataParams {
  page?: number;
  name?: string;
  reset?: boolean;
}

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCharacters: builder.query<GetCharactersResp, GetCharacters>({
      query: ({ name = '', page = 1, limit = DEFAULT_NUMBER_OF_ITEMS }) =>
        `/characters?limit=${limit}&name=${name}&page=${page}`,
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id: string) => `/characters/${id}`,
    }),
  }),
});
