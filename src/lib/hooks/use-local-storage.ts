import { useEffect, useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/local-storage.utils';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const storedValue = getLocalStorageItem(key);

    if (storedValue) {
      setState(JSON.parse(storedValue));
    }
  }, [key]);

  const setValue = (value: T) => {
    setLocalStorageItem(key, value);
    setState(value);
  };

  return {
    value: state,
    setValue
  };
};
