import 'whatwg-fetch';
import { RICK_AND_MORTY_API_URL } from '@constants/api.constants';
import { CombinedState, createApi, EndpointDefinitions, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UnknownAction, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@store/store';

type ExtractRehydrationInfoParams = {
  reducerPath: string;
};

export const baseCardsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: RICK_AND_MORTY_API_URL }),
  extractRehydrationInfo: (
    action: UnknownAction,
    { reducerPath }: ExtractRehydrationInfoParams
  ): CombinedState<EndpointDefinitions, 'Cards', string> | undefined => {
    if (action.type === HYDRATE) {
      return (action as PayloadAction<RootState>).payload[reducerPath];
    }
    return undefined;
  },
  tagTypes: ['Cards'],
  endpoints: () => ({}),
});
