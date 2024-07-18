import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  characters: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  selectors: {
    getCharacters: (state) => {
      state.characters;
    },
  },
  reducers: {
    setCharacters(state, action) {
      state.characters = action.payload;
    },
  },
});

export const { setCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
