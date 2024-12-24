import { Client, ClientConfig } from 'pg';
import { ConnectionError, DatabaseError } from '../storage-errors';

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
