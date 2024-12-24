export const getLocalStorageItem = <T>(key: string): T => {
  return JSON.parse(window.localStorage.getItem(key) ?? '') as T;
};

export const setLocalStorageItem = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
