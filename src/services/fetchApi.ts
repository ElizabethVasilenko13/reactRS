import {
  MOVIES_API_URL,
  MOVIES_TITLE_SEARCH_ENDPOINT,
} from '../constants/api.constants';

export const fetchSearchResults = async (searchTerm: string) => {
  try {
    const apiUrl = `${MOVIES_API_URL}${MOVIES_TITLE_SEARCH_ENDPOINT}${searchTerm}?exact=false&titleType=movie`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_MOVIES_API_KEY,
        'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    return error;
  }
};

// check ofline
// types
