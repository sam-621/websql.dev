'use server';

import { Storage } from '@/lib/storage';
import { QueryError } from '@/lib/storage/storage-errors';
import { ConnectionConfig } from '@/lib/types/connection.type';

export const buildQuery = async (connection: ConnectionConfig, input: Input) => {
  const storage = new Storage(connection);
  let primaryKey = await storage.getPrimaryKey(input.table);

  if (primaryKey instanceof QueryError) {
    primaryKey = '';
  }

  const fields = input.fields?.length
    ? [...input.fields, primaryKey]
        .filter(Boolean)
        // in postgresql we need to wrap field names in double quotes to avoid cases where the field name is a reserved keyword
        .map(f => (connection.type == 'postgresql' ? `"${f}"` : f))
        .join(', ')
    : '*';
  const limit = input.limit ? `LIMIT ${input.limit}` : 'LIMIT 100';

  const query = `SELECT ${fields} FROM ${input.table} ${limit}`;

  const result = await storage.buildQuery(query);
  const columns = await storage.getColumns(input.table);

  if (result instanceof QueryError) {
    return { error: 'Failed to build query' };
  }

  if (columns instanceof QueryError) {
    return { error: 'Failed to fetch columns' };
  }

  return {
    rows: result.rows,
    columns,
    primaryKey
  };
};

type Input = {
  table: string;
  fields?: string[];
  limit?: number;
};
