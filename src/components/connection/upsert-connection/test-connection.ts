'use server';

import { PostgreSQL } from '@/lib/storage/postgresql';
import { ConnectionConfig } from '@/lib/types/connection.type';

export const testConnection = async (connection: ConnectionConfig) => {
  if (connection.type === 'mysql') {
    return true;
  }

  if (connection.type === 'postgresql') {
    const postgresql = new PostgreSQL(connection.url);

    return postgresql.testConnection();
  }

  return false;
};
