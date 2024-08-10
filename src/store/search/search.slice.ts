import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageData } from '@utils/local-storage';

type SearchState = {
  searchCharacterTerm: string;
};

const initialState: SearchState = {
  searchCharacterTerm: getLocalStorageData('searchQuery', ''),
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    saveSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchCharacterTerm = action.payload;
    },
  },
});

export const { saveSearchTerm } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
