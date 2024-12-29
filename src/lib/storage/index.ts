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

  async execute(queries: string[]) {
    return this.client.execute(queries);
  }

  async getTables() {
    return this.client.getTables();
  }

  async buildQuery(query: string, values: string[]) {
    return this.client.buildQuery(query, values);
  }

  async getPrimaryKey(tableName: string) {
    return this.client.getPrimaryKey(tableName);
  }

  async getColumns(tableName: string) {
    return this.client.getColumns(tableName);
  }
}
