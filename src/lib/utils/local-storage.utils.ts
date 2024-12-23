export const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
