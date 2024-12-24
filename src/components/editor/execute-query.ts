'use server';

import { PostgreSQL } from '@/lib/storage/postgresql';
import { QueryError } from '@/lib/storage/storage-errors';
import { Connection } from '@/lib/types/connection.type';

export const executeQuery = async (connection: Connection, query: string) => {
  const postgresql = new PostgreSQL(connection.url);

  const result = await postgresql.execute(query);

  if (result instanceof QueryError) {
    return { error: 'Failed to execute query' };
  }

  return result;
};
