import mysql from 'mysql2/promise';
import { ExecuteResult, StorageClient } from './storage-client';
import { ConnectionError, DatabaseError, QueryError } from './storage-errors';

export class MySQL implements StorageClient {
  private client: mysql.Connection | null;

  constructor(private connectionString: string) {
    this.connectionString = connectionString;
    this.client = null;
  }

  async testConnection(): Promise<boolean> {
    const client = await this.createConnection();

    if (client instanceof DatabaseError) {
      return false;
    }

    this.client?.destroy();
    return true;
  }

  async execute(query: string): Promise<ExecuteResult | QueryError> {
    const client = await this.createConnection();

    if (client instanceof DatabaseError) {
      return new QueryError('Connection error', client);
    }

    try {
      const [rows] = await client.execute(query);

      this.client?.destroy();

      if (Array.isArray(rows)) {
        return {
          rows: rows as Record<string, unknown>[],
          rowCount: rows.length
        };
      } else {
        return {
          rows: [],
          rowCount: 0,
          affectedRows: rows.affectedRows
        };
      }
    } catch (error) {
      // @ts-expect-error error is an instance of Error
      return new QueryError(error.message, error);
    }
  }

  async getTables(): Promise<QueryError | string[]> {
    const client = await this.createConnection();

    if (client instanceof DatabaseError) {
      return [];
    }

    try {
      const [rows] = await client.execute(`SHOW TABLES`);

      this.client?.destroy();

      if (Array.isArray(rows)) {
        return rows.map(
          row =>
            (row as Record<string, unknown>)[
              `Tables_in_${this.connectionString.split('/').pop()}`
            ] as string
        );
      } else {
        return [];
      }
    } catch (error) {
      // @ts-expect-error error is an instance of Error
      return new QueryError(error.message, error);
    }
  }

  private async createConnection() {
    try {
      if (this.client) {
        return this.client;
      }

      this.client = await mysql.createConnection(this.connectionString);

      return this.client;
    } catch (error) {
      return new ConnectionError(error);
    }
  }
}
