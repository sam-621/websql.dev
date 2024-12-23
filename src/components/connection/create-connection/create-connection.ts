import { StorageKeys } from '@/lib/constants/storage.constants';
import { CreateConnectionFormInput } from './use-create-connection-form';
import { Connection } from '@/lib/types/connection.type';
import { generateId } from '@/lib/utils';

export const createConnection = (input: CreateConnectionFormInput) => {
  if (input.type === 'postgresql' && !input.database) {
    return { error: 'Database is required', field: 'database' };
  }

  const currentConnections = JSON.parse(
    window.localStorage.getItem(StorageKeys.Connections) || '[]'
  ) as Connection[];

  const newConnections = [...currentConnections, { id: generateId(), ...input }];

  window.localStorage.setItem(StorageKeys.Connections, JSON.stringify(newConnections));
};
