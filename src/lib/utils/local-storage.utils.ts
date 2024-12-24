export const getLocalStorageItem = <T>(key: string): T => {
  const raw = window.localStorage.getItem(key);

  return raw ? JSON.parse(raw) : null;
};

export const setLocalStorageItem = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
