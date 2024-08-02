import 'whatwg-fetch';
import { RICK_AND_MORTY_API_URL } from '@constants/api.constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseCardsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: RICK_AND_MORTY_API_URL }),
  tagTypes: ['Cards'],
  endpoints: () => ({}),
});
