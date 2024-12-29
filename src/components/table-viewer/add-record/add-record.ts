'use server';

import { Storage } from '@/lib/storage';
import { QueryError } from '@/lib/storage/storage-errors';
import { ConnectionConfig } from '@/lib/types/connection.type';

export const addRecord = async (connection: ConnectionConfig, input: Input) => {
  const storage = new Storage(connection);

  const fields = Object.keys(input.values).join(', ');
  const values = Object.values(input.values)
    .map(v => `'${v}'`)
    .join(', ');

  const query = `INSERT INTO ${input.table} (${fields}) VALUES (${values})`;

  const result = await storage.execute([query]);

  if (result instanceof QueryError) {
    return { error: result.clientMsg };
  }
};

type Input = {
  table: string;
  values: Record<string, unknown>;
};
