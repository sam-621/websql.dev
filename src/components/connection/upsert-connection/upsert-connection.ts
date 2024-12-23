import { StorageKeys } from '@/lib/constants/storage.constants';
import { Connection } from '@/lib/types/connection.type';
import { generateId } from '@/lib/utils';
import { UpsertConnectionFormInput } from './use-upsert-connection-form';

export const upsertConnection = (input: UpsertConnectionFormInput & { id?: string }) => {
  if (input.type === 'postgresql' && !input.database) {
    return { error: 'Database is required', field: 'database' };
  }

  if (input.id) {
    const currentConnections = JSON.parse(
      window.localStorage.getItem(StorageKeys.Connections) || '[]'
    ) as Connection[];

    const newConnections = currentConnections.map(connection =>
      connection.id === input.id ? { ...connection, ...input } : connection
    );

    window.localStorage.setItem(StorageKeys.Connections, JSON.stringify(newConnections));

    return;
  }

  const currentConnections = JSON.parse(
    window.localStorage.getItem(StorageKeys.Connections) || '[]'
  ) as Connection[];

  const newConnections = [...currentConnections, { id: generateId(), ...input }];

  window.localStorage.setItem(StorageKeys.Connections, JSON.stringify(newConnections));
};
