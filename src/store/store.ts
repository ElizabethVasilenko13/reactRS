import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { baseCardsApi } from './api/baseCardsApi';
import { cardsReducer } from './cards/cards.slice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  cards: cardsReducer,
  [baseCardsApi.reducerPath]: baseCardsApi.reducer,
});

const makeStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseCardsApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });