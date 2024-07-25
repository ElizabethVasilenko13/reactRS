import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { baseCardsApi } from './api/baseCardsApi';
import { searchReducer } from './search/search.slice';
import { cardsReducer } from './cards/cards.slice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cards: cardsReducer,
    [baseCardsApi.reducerPath]: baseCardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseCardsApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
