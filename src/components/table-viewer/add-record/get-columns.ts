'use server';

import { Storage } from '@/lib/storage';
import { QueryError } from '@/lib/storage/storage-errors';
import { ConnectionConfig } from '@/lib/types/connection.type';

export const getColumns = async (connection: ConnectionConfig, input: Input) => {
  const storage = new Storage(connection);

  const result = await storage.getColumns(input.table);

  if (result instanceof QueryError) {
    return { error: result.clientMsg };
  }

  return {
    columns: result
  };
};

type Input = {
  table: string;
};
