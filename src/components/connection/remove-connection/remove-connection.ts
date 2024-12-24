import { StorageKeys } from '@/lib/constants/storage.constants';
import { Connection } from '@/lib/types/connection.type';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/utils/local-storage.utils';

export const removeConnection = (id: string) => {
  const connections = getLocalStorageItem<Connection[]>(StorageKeys.Connections);
  console.log('connections', connections);

  const newConnections = connections.filter(connection => connection.id !== id);

  setLocalStorageItem(StorageKeys.Connections, newConnections);
};
