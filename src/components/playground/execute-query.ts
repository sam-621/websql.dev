'use server';

import { PostgreSQL } from '@/lib/storage/postgresql';
import { QueryError } from '@/lib/storage/storage-errors';
import { Connection } from '@/lib/types/connection.type';

export const executeQuery = async (connection: Connection, query: string): Promise<Result> => {
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

type Result =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      rows: Record<string, unknown>[];
      rowCount: number;
    };
