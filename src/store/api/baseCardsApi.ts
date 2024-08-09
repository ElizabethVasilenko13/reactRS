import 'whatwg-fetch';
import { RICK_AND_MORTY_API_URL } from '@constants/api.constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@store/store';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const baseCardsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: RICK_AND_MORTY_API_URL }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Cards'],
  endpoints: () => ({}),
});
