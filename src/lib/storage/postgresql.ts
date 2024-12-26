import { Client, ClientConfig, QueryResult } from 'pg';
import { ConnectionError, DatabaseError, QueryError } from './storage-errors';
import { ExecuteResult, StorageClient } from './storage-client';

export class PostgreSQL implements StorageClient {
  private client: Client | null;

  constructor(private config: ClientConfig | string) {
    this.config = config;
    this.client = null;
  }

  async testConnection(): Promise<boolean> {
    const result = await this.createConnection();

    if (result instanceof DatabaseError) {
      return false;
    }

    this.client?.end();
    this.client = null;
    return true;
  }

  async execute(query: string[]): Promise<ExecuteResult | QueryError> {
    const client = await this.createConnection();

    if (client instanceof DatabaseError) {
      return new QueryError('Connection error', client);
    }

    try {
      let result: QueryResult | null = null;

      for (const q of query) {
        // Always save the last query result
        result = await client.query(q);
      }

      this.client?.end();
      this.client = null;

      return {
        rows: result?.rows ?? [],
        rowCount: result?.rowCount ?? 0,
        affectedRows: ['INSERT', 'UPDATE', 'DELETE'].includes(result?.command ?? '')
          ? result?.rowCount ?? 0
          : 0
      };
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
      const result = await client.query(
        'SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema()'
      );

      this.client?.end();
      this.client = null;

      return result.rows.map((row: { table_name: string }) => row.table_name);
    } catch (error) {
      return new QueryError('Failed to get tables', error);
    }
  }

  private async createConnection() {
    try {
      if (this.client) {
        return this.client;
      }

      this.client = new Client(this.config);

      await this.client.connect();

      return this.client;
    } catch (error) {
      return new ConnectionError(error);
    }
  }
}
