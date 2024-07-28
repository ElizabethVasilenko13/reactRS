import { searchReducer, saveSearchTerm } from './search.slice';

jest.mock('@utils/local-storage', () => ({
  getLocalStorageData: jest.fn(),
  saveLocalStorageData: jest.fn(),
}));

describe('searchSlice', () => {
  const initialState = {
    searchCharacterTerm: '',
  };

  it('should handle saveSearchTerm', () => {
    const action = saveSearchTerm('Morty');
    const state = searchReducer(initialState, action);
    expect(state.searchCharacterTerm).toEqual('Morty');
  });
});
