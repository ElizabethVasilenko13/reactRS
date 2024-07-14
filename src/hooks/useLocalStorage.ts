import { useState, useEffect } from 'react';

const getLocalStorageData = <T>(key: string, initialValue: T) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initialValue;
};

const saveLocalStorageData = <T>(key: string, localStorageData: T) => {
  localStorage.setItem(key, JSON.stringify(localStorageData));
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [localStorageData, setLocalStorageData] = useState(() => getLocalStorageData(key, initialValue));

  useEffect(() => {
    saveLocalStorageData(key, localStorageData);

    return () => {
      saveLocalStorageData(key, localStorageData);
    };
  }, [key, localStorageData]);

  return [localStorageData, setLocalStorageData];
};
