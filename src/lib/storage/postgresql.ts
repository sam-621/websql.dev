import { Client, ClientConfig } from 'pg';
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
    return true;
  }

  async execute(query: string): Promise<ExecuteResult | QueryError> {
    const client = await this.createConnection();

    if (client instanceof DatabaseError) {
      return new QueryError('Connection error', client);
    }

    try {
      const result = await client.query(query);
      this.client?.end();

      return {
        rows: result.rows,
        rowCount: result.rowCount ?? 0
      };
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

      this.client = new Client(this.config);

      await this.client.connect();

      return this.client;
    } catch (error) {
      return new ConnectionError(error);
    }
  }
}
