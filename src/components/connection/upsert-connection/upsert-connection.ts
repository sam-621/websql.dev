import { StorageKeys } from '@/lib/constants/storage.constants';
import { Connection } from '@/lib/types/connection.type';
import { generateId } from '@/lib/utils';
import { UpsertConnectionFormInput } from './use-upsert-connection-form';
import { testConnection } from './test-connection';

export const upsertConnection = async (input: UpsertConnectionFormInput & { id?: string }) => {
  const isValid = await testConnection(input);

  if (!isValid) {
    return { error: 'Connection failed' };
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
