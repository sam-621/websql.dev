'use server';

import { Storage } from '@/lib/storage';
import { QueryError } from '@/lib/storage/storage-errors';
import { Connection } from '@/lib/types/connection.type';

export const executeQuery = async (connection: Connection, query: string): Promise<Result> => {
  const storage = new Storage(connection);

  const result = await storage.execute(query);
  console.log({
    result1: result
  });

  if (result instanceof QueryError) {
    return { success: false, error: result.clientMsg };
  }

  return {
    success: true,
    ...result
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
      affectedRows?: number;
    };
