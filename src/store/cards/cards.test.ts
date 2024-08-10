import { CharacterId } from '@models/rick-and-morty-api.interface';
import { select, unselect, unselectAll, cardsReducer } from './cards.slice';
import { selectedCardsState } from '../../__mocks__/selectedCards';

describe('cardsSlice', () => {
  const initialState = {
    selectedCards: {},
  };

  const mockCharacter = selectedCardsState[1];

  it('should return the initial state', () => {
    const state = cardsReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('should handle select', () => {
    const action = select(mockCharacter);
    const state = cardsReducer(initialState, action);
    expect(state.selectedCards).toEqual({ 1: mockCharacter });
  });

  it('should handle unselect', () => {
    const preloadedState = {
      selectedCards: { 1: mockCharacter },
    };

    const action = unselect('1' as CharacterId);
    const state = cardsReducer(preloadedState, action);
    expect(state.selectedCards).toEqual({});
  });

  it('should handle unselectAll', () => {
    const preloadedState = {
      selectedCards: { 1: mockCharacter, 2: mockCharacter },
    };

    const action = unselectAll();
    const state = cardsReducer(preloadedState, action);
    expect(state.selectedCards).toEqual({});
  });
});
