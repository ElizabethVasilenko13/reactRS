export const fetchData = async (apiUrl: string) => {
  const apiKey = process.env.VITE_MOVIES_API_KEY || '';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
        'Cache-Control': 'no-cache',
      },
    });

    if (response.status === 304) {
      console.log('Data not modified');
      return 'Data not modified';
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('No internet connection or failed to fetch data');
      return 'No internet connection or failed to fetch data';
    }
    return error;
  }
};
