'use server';

import { Storage } from '@/lib/storage';
import { QueryError } from '@/lib/storage/storage-errors';
import { ConnectionConfig } from '@/lib/types/connection.type';

export const retrieveConnectionData = async (connection: ConnectionConfig) => {
  const storage = new Storage(connection);
  const tables = await storage.getTables();

  if (tables instanceof QueryError) {
    return {
      error: 'Failed to retrieve tables'
    };
  }

  return {
    tables
  };
};
