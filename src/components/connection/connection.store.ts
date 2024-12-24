import { Connection, ConnectionConfig } from '@/lib/types/connection.type';
import { generateId } from '@/lib/utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Schema = {
  connections: Connection[];
  selectedConnection: Connection | null;
  selectConnection: (connection: Connection) => void;
  create: (connection: ConnectionConfig) => void;
  update: (connection: Connection) => void;
  remove: (id: string) => void;
};

export const useConnectionStore = create<Schema>()(
  persist(
    set => ({
      connections: [],
      selectedConnection: null,
      selectConnection(connection) {
        set({ selectedConnection: connection });
      },
      create(connection) {
        const newConnection = { ...connection, id: generateId() };

        set(state => ({
          connections: [...state.connections, newConnection],
          selectedConnection:
            state.connections.length === 0 ? newConnection : state.selectedConnection
        }));
      },
      remove(id) {
        set(state => ({
          connections: state.connections.filter(connection => connection.id !== id),
          selectedConnection: state.selectedConnection?.id === id ? null : state.selectedConnection
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
