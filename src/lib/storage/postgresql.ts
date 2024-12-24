import { Client, ClientConfig } from 'pg';
import { ConnectionError, DatabaseError, QueryError } from './storage-errors';

export class PostgreSQL {
  private client: Client | null;

  constructor(private config: ClientConfig | string) {
    this.config = config;
    this.client = null;
  }

  async testConnection() {
    const result = await this.createConnection();

    if (result instanceof DatabaseError) {
      return false;
    }

    this.client?.end();
    return true;
  }

  async execute(query: string) {
    const client = await this.createConnection();

    if (client instanceof DatabaseError) {
      return client;
    }

    try {
      const result = await client.query(query);
      console.log({ result });

      return {
        rows: result.rows,
        rowCount: result.rowCount
      };
    } catch (error) {
      return new QueryError(error);
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
