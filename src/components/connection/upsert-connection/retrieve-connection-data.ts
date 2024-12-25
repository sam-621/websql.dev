'use server';

import { Storage } from '@/lib/storage';
import { ConnectionConfig } from '@/lib/types/connection.type';

export const retrieveConnectionData = async (connection: ConnectionConfig) => {
  const storage = new Storage(connection);
  const tables = await storage.getTables();

  return {
    tables
  };
};
