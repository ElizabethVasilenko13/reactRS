export const getLocalStorageData = <T>(key: string, initialValue: T) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initialValue;
  }
  return initialValue;
};

export const saveLocalStorageData = <T>(key: string, localStorageData: T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(localStorageData));
  }
};
