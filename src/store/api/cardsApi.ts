import { CharacterId, CharacterInfo, RickAndMortyApiResp } from '@models/rick-and-morty-api.interface';
import { API_CHARACTER_ENDPOINT } from '@constants/api.constants';
import { baseCardsApi } from './baseCardsApi';

export const usersApi = baseCardsApi.injectEndpoints({
  endpoints: (create) => ({
    getCards: create.query<RickAndMortyApiResp, { name: string; page: number }>({
      query: ({ name, page = 1 }) => `${API_CHARACTER_ENDPOINT}?name=${name}&page=${page}`,
      // providesTags: ["Users", { type: "Users", id: "LIST" }],
      // transformResponse: (res: unknown) => UserDtoSchema.array().parse(res),
    }),
    getCard: create.query<CharacterInfo, CharacterId>({
      query: (characterId) => `${API_CHARACTER_ENDPOINT}/${characterId || ''}`,
    }),
  }),
  overrideExisting: true,
});
