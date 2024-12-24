import { QueryError } from './storage-errors';

export interface Storage {
  testConnection(): Promise<boolean>;
  execute(query: string): Promise<ExecuteResult | QueryError>;
}

export type ExecuteResult = {
  rows: Record<string, unknown>[];
  rowCount: number;
};
