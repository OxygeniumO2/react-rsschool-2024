import selectedCardsReducer, {
  SelectedCardsState,
  setSelectedCard,
  clearCards,
} from '../src/store/selectedCardsSlice';
import { Character } from '../src/services/narutoApi';

describe('selectedCardsSlice', () => {
  const initialState: SelectedCardsState = {
    selectedCards: [],
  };

  const character1: Character = {
    id: '1',
    name: 'Naruto',
    images: [],
    debut: {
      appearsIn: 'test',
    },
    personal: {
      sex: 'test',
      clan: 'test',
      classification: 'test',
    },
  };
  const character2: Character = {
    id: '2',
    name: 'Sasuke',
    images: [],
    debut: {
      appearsIn: 'test',
    },
    personal: {
      sex: 'test',
      clan: 'test',
      classification: 'test',
    },
  };

  it('should handle initial state', () => {
    expect(selectedCardsReducer(undefined, { type: 'unknown' })).toEqual({
      selectedCards: [],
    });
  });

  it('should handle setSelectedCard (add card)', () => {
    const actual = selectedCardsReducer(
      initialState,
      setSelectedCard(character1)
    );
    expect(actual.selectedCards).toEqual([character1]);
  });

  it('should handle setSelectedCard (remove card)', () => {
    const stateWithCard = { selectedCards: [character1] };
    const actual = selectedCardsReducer(
      stateWithCard,
      setSelectedCard(character1)
    );
    expect(actual.selectedCards).toEqual([]);
  });

  it('should handle setSelectedCard (toggle card)', () => {
    const stateWithCard = { selectedCards: [character1] };
    let actual = selectedCardsReducer(
      stateWithCard,
      setSelectedCard(character1)
    );
    expect(actual.selectedCards).toEqual([]);

    actual = selectedCardsReducer(actual, setSelectedCard(character1));
    expect(actual.selectedCards).toEqual([character1]);
  });

  it('should handle clearCards', () => {
    const stateWithCards = { selectedCards: [character1, character2] };
    const actual = selectedCardsReducer(stateWithCards, clearCards());
    expect(actual.selectedCards).toEqual([]);
  });
});
