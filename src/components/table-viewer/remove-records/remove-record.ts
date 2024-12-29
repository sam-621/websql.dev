'use server';

import { Storage } from '@/lib/storage';
import { QueryError } from '@/lib/storage/storage-errors';
import { ConnectionConfig } from '@/lib/types/connection.type';

export const removeRecords = async (connection: ConnectionConfig, input: Input) => {
  const storage = new Storage(connection);

  const primaryKey = await storage.getPrimaryKey(input.table);

  if (primaryKey instanceof QueryError) {
    return { error: 'Failed to retrieve primary key' };
  }

  const results = await Promise.all(
    input.primaryKeys.map(async key => {
      const result = await storage.execute([
        `DELETE FROM ${input.table} WHERE ${primaryKey} = '${key}'`
      ]);

      if (result instanceof QueryError) {
        return { error: result.clientMsg };
      }
    })
  );

  const error = results.find(r => r?.error);

  if (error) {
    return { error: error.error };
  }
};

type Input = {
  table: string;
  primaryKeys: string[];
};
