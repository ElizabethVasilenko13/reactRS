import { CharacterId, CharacterInfo } from '@models/rick-and-morty-api.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CardsState = {
  selectedCards: Record<CharacterId, CharacterInfo>;
};

const initialState: CardsState = {
  selectedCards: {},
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<CharacterInfo>) => {
      const card = action.payload;
      state.selectedCards[card.id] = card;
    },
    unselect: (state, action: PayloadAction<CharacterId>) => {
      delete state.selectedCards[action.payload];
    },
    unselectAll: (state) => {
      state.selectedCards = {};
    },
  },
});

export const { select, unselect, unselectAll } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
