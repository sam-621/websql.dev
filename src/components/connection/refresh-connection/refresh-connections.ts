'use server';

import { Storage } from '@/lib/storage';
import { QueryError } from '@/lib/storage/storage-errors';
import { Connection } from '@/lib/types/connection.type';

export const refreshConnections = async (connections: Connection[]) => {
  const newData = await Promise.all(
    connections.map(async conn => {
      const storage = new Storage(conn);
      const tables = await storage.getTables();

      if (tables instanceof QueryError) {
        return {
          error: 'Failed to retrieve tables'
        };
      }

      return {
        connection: {
          ...conn,
          tables
        }
      };
    })
  );

  return newData;
};
