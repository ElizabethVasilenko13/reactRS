import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_CHARACTER_ENDPOINT } from '@constants/api.constants';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';
import { mockSearchResults } from './serachResult';

export const server = setupServer(
  http.get(`${API_CHARACTER_ENDPOINT}`, () => {
    return HttpResponse.json({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: mockSearchResults as CharacterInfo[],
    });
  }),

  http.get(`${API_CHARACTER_ENDPOINT}/1`, () => {
    return HttpResponse.json(mockSearchResults[0] as CharacterInfo);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
