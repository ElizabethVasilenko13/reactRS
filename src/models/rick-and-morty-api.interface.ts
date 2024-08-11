export interface RickAndMortyApiResp {
  info: PageInfo;
  results: CharacterInfo[];
}

export interface PageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export type CharacterId = string;
export interface CharacterInfo {
  id: CharacterId;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Origin {
  name: string;
  url: string;
}

interface Location extends Origin {}

export interface ApiError {
  error: string;
}
