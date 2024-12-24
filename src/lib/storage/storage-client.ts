import { ConnectionConfig } from '../types/connection.type';
import { PostgreSQL } from './postgresql';
import { QueryError } from './storage-errors';

export interface StorageClient {
  testConnection(): Promise<boolean>;
  execute(query: string): Promise<ExecuteResult | QueryError>;
}

export type ExecuteResult = {
  rows: Record<string, unknown>[];
  rowCount: number;
};

export const getStorage = (type: ConnectionConfig['type']) => {
  if (type === 'postgresql') {
    return PostgreSQL;
  }

  throw new Error('Unsupported storage type');
};
