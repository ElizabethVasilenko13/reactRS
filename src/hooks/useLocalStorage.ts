import { useState, useEffect } from 'react';

const getLocalStorageData = <T>(key: string, initialValue: T): T => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data) as T;
      } catch (e) {
        console.error('Error parsing JSON from localStorage:', e);
      }
    }
  }
  return initialValue;
};

const saveLocalStorageData = <T>(key: string, localStorageData: T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(localStorageData));
  }
};

export const useLocalStorage = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [localStorageData, setLocalStorageData] = useState<T>(() => getLocalStorageData(key, initialValue));

  useEffect(() => {
    saveLocalStorageData(key, localStorageData);
  }, [key, localStorageData]);

  return [localStorageData, setLocalStorageData];
};
