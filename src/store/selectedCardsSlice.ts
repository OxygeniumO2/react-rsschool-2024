import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../services/narutoApi';

export interface SelectedCardsState {
  selectedCards: Character[];
}

const initialState: SelectedCardsState = {
  selectedCards: [],
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  selectors: {
    getSelectedCards: (state) => {
      state.selectedCards;
    },
  },
  reducers: {
    setSelectedCard(state, action: PayloadAction<Character>) {
      const cardIndex = state.selectedCards.findIndex(
        (card) => card.id === action.payload.id
      );

      if (cardIndex !== -1) {
        state.selectedCards.splice(cardIndex, 1);
      } else {
        state.selectedCards.push(action.payload);
      }
    },
    clearCards(state) {
      state.selectedCards = [];
    },
  },
});
export const { setSelectedCard, clearCards } = selectedCardsSlice.actions;
export default selectedCardsSlice.reducer;
