import { ConnectionConfig } from '../types/connection.type';
import { MySQL } from './mysql';
import { PostgreSQL } from './postgresql';
import { StorageClient } from './storage-client';

export class Storage {
  private client: StorageClient;

  constructor(connection: ConnectionConfig) {
    if (connection.type === 'postgresql') {
      this.client = new PostgreSQL(connection.url);
    } else if (connection.type === 'mysql') {
      this.client = new MySQL(connection.url);
    } else {
      throw new Error('Unsupported storage');
    }
  }

  async testConnection(): Promise<boolean> {
    return this.client.testConnection();
  }

  async execute(query: string) {
    return this.client.execute(query);
  }
}
