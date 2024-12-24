import { ConnectionConfig } from '../types/connection.type';
import { PostgreSQL } from './postgresql';
import { StorageClient } from './storage-client';

export class Storage {
  private client: StorageClient;
  private connection: ConnectionConfig;

  constructor(connection: ConnectionConfig) {
    this.connection = connection;

    if (connection.type === 'postgresql') {
      this.client = new PostgreSQL(connection.url);
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

  private static getClient(type: ConnectionConfig['type']) {
    if (type === 'postgresql') {
      return PostgreSQL;
    }

    throw new Error('Unsupported storage');
  }
}
