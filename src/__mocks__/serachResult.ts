import { CharacterInfo } from '@models/rick-and-morty-api.interface';

export const mockSearchResults: CharacterInfo[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: '',
    },
    location: {
      name: 'Earth',
      url: '',
    },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: '',
    },
    location: {
      name: 'Earth',
      url: '',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: [],
    url: '',
    created: '',
  },
];
