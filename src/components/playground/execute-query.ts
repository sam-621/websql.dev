'use server';

import { PostgreSQL } from '@/lib/storage/postgresql';
import { QueryError } from '@/lib/storage/storage-errors';
import { Connection } from '@/lib/types/connection.type';
import { QueryResult } from '@/lib/types/query.type';

export const executeQuery = async (connection: Connection, query: string): Promise<QueryResult> => {
  const postgresql = new PostgreSQL(connection.url);

  const result = await postgresql.execute(query);

  if (result instanceof QueryError) {
    return { success: false, error: result.clientMsg };
  }

  return {
    success: true,
    rows: result.rows,
    rowCount: result.rowCount
  };
};
