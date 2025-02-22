import { ConnectionConfig, TableColumn } from '../types/connection.type';
import { PostgreSQL } from './postgresql';
import { QueryError } from './storage-errors';

export interface StorageClient {
  testConnection(): Promise<boolean>;
  execute(query: string[]): Promise<ExecuteResult | QueryError>;
  getTables(): Promise<QueryError | string[]>;
  buildQuery(query: string): Promise<Pick<ExecuteResult, 'rows' | 'rowCount'> | QueryError>;
  getPrimaryKey(tableName: string): Promise<QueryError | string>;
  getColumns(tableName: string): Promise<QueryError | TableColumn[]>;
}

export type ExecuteResult = {
  rows: Record<string, unknown>[];
  rowCount: number;
  affectedRows?: number;
};

export const getStorage = (type: ConnectionConfig['type']) => {
  if (type === 'postgresql') {
    return PostgreSQL;
  }

  throw new Error('Unsupported storage type');
};
