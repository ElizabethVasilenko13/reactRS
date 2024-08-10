export const getLocalStorageData = <T>(key: string, initialValue: T) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initialValue;
};

export const saveLocalStorageData = <T>(key: string, localStorageData: T) => {
  localStorage.setItem(key, JSON.stringify(localStorageData));
};
