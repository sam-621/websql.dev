'use server';

import { Storage } from '@/lib/storage';
import { QueryError } from '@/lib/storage/storage-errors';
import { ConnectionConfig } from '@/lib/types/connection.type';

export const buildQuery = async (connection: ConnectionConfig, input: Input) => {
  const storage = new Storage(connection);

  const fields = input.fields?.length ? input.fields.join(', ') : '*';
  const limit = input.limit ? `LIMIT ${input.limit}` : 'LIMIT 100';

  const result = await storage.buildQuery(`SELECT ${fields} FROM ${input.table} ${limit}`, []);

  if (result instanceof QueryError) {
    return { error: 'Failed to build query' };
  }

  return {
    rows: result.rows
  };
};

type Input = {
  table: string;
  fields?: string[];
  limit?: number;
};
