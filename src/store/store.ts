import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { baseCardsApi } from './api/baseCardsApi';
import { searchReducer } from './search/search.slice';
import { cardsReducer } from './cards/cards.slice';

const rootReducer = combineReducers({
  search: searchReducer,
  cards: cardsReducer,
  [baseCardsApi.reducerPath]: baseCardsApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseCardsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispath = () => useDispatch<AppDispatch>();

export const store = setupStore();
