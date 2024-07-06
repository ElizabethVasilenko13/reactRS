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
        'x-rapidapi-key': '5235c39fccmshdc2635cd7e0e5a2p1e3f17jsnd14ab9e0d89c',
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
// install scss
// types
// loader
