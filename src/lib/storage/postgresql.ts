import { Client, ClientConfig, QueryResult } from 'pg';
import { ConnectionError, DatabaseError, QueryError } from './storage-errors';
import { ExecuteResult, StorageClient } from './storage-client';
import { TableColumn } from '../types/connection.type';

export class PostgreSQL implements StorageClient {
  private client: Client | null;

  constructor(private config: ClientConfig | string) {
    this.config = config;
    this.client = null;
  }

  async testConnection(): Promise<boolean> {
    if (
      typeof this.config === 'string' &&
      !this.config.startsWith('postgresql://') &&
      !this.config.startsWith('postgres://')
    ) {
      return false;
    }

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

  async buildQuery(query: string): Promise<Pick<ExecuteResult, 'rows' | 'rowCount'> | QueryError> {
    const client = await this.createConnection();

    if (client instanceof DatabaseError) {
      return new QueryError('Failed to connect', client);
    }

    try {
      const result = await client.query(query);

      this.client?.end();
      this.client = null;

      return {
        rows: result.rows,
        rowCount: result.rowCount ?? 0
      };
    } catch (error) {
      return new QueryError('Failed to get tables', error);
    }
  }

  async getPrimaryKey(tableName: string): Promise<QueryError | string> {
    const client = await this.createConnection();

    if (client instanceof DatabaseError) {
      return new QueryError('Failed to connect', client);
    }

    try {
      const result = await client.query(
        `SELECT column_name FROM information_schema.key_column_usage WHERE table_name = '${tableName.toLowerCase()}'`
      );

      this.client?.end();
      this.client = null;

      return result.rows[0].column_name;
    } catch (error) {
      return new QueryError('Failed to retrieve primary key', error);
    }
  }

  async getColumns(tableName: string): Promise<QueryError | TableColumn[]> {
    const client = await this.createConnection();

    if (client instanceof DatabaseError) {
      return new QueryError('Failed to connect', client);
    }

    try {
      const result = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = '${tableName}';`);

      this.client?.end();
      this.client = null;

      return result.rows.map(row => ({
        name: row.column_name,
        required: row.is_nullable === 'NO',
        default: row.column_default
      }));
    } catch (error) {
      return new QueryError('Failed to retrieve columns', error);
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
