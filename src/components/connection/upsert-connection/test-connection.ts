'use server';

import { Storage } from '@/lib/storage';
import { ConnectionConfig } from '@/lib/types/connection.type';

export const testConnection = async (connection: ConnectionConfig) => {
  const storage = new Storage(connection);
  const r = await storage.getTables();

  console.log({
    r
  });

  return storage.testConnection();
};
