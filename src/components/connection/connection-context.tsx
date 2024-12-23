'use client';

import { StorageKeys } from '@/lib/constants/storage.constants';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { Connection } from '@/lib/types/connection.type';
import { createContext, FC, PropsWithChildren, useContext, useEffect } from 'react';

type Schema = {
  connections: Connection[];
  selected: string;
  setSelected: (selected: string) => void;
};

const Context = createContext<Schema>({
  connections: [],
  selected: '',
  setSelected: () => {}
});

export const ConnectionContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { value: connections } = useLocalStorage<Connection[]>(StorageKeys.Connections, []);
  const { value, setValue } = useLocalStorage<string>(StorageKeys.SelectedConnection, '');

  useEffect(() => {
    if (!value) {
      setValue(connections?.[0]?.id || '');
    }
  }, [connections]);

  return (
    <Context.Provider value={{ connections, selected: value, setSelected: setValue }}>
      {children}
    </Context.Provider>
  );
};

export const useConnectionContext = () => useContext(Context);
