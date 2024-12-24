import { Connection, ConnectionConfig } from '@/lib/types/connection.type';
import { generateId } from '@/lib/utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Schema = {
  connections: Connection[];
  selectedConnection: Connection | null;
  create: (connection: ConnectionConfig) => void;
  update: (connection: Connection) => void;
  remove: (id: string) => void;
};

export const useConnectionStore = create<Schema>()(
  persist(
    set => ({
      connections: [],
      selectedConnection: null,
      create(connection) {
        set(state => ({
          connections: [...state.connections, { ...connection, id: generateId() }]
        }));
      },
      remove(id) {
        set(state => ({
          connections: state.connections.filter(connection => connection.id !== id)
        }));
      },
      update(connection) {
        set(state => ({
          connections: state.connections.map(c => (c.id === connection.id ? connection : c))
        }));
      }
    }),
    { name: 'connections-storage' }
  )
);
