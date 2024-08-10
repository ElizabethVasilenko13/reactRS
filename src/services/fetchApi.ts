export const fetchData = async <T>(apiUrl: string): Promise<T | string | Error> => {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
    });

    if (response.status === 304) {
      return 'Data not modified';
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return 'No internet connection or failed to fetch data';
    }
    return error as Error;
  }
};
