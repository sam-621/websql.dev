import { StorageKeys } from '@/lib/constants/storage.constants';
import { Connection } from '@/lib/types/connection.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Schema = {
  selected: { connection: Connection['id']; table: string } | null;
  select: (connection: Connection['id'], table: string) => void;
};

export const useTableViewerStore = create<Schema>()(
  persist(
    set => ({
      selected: null,
      select(connection, table) {
        set({ selected: { connection, table } });
      }
    }),
    { name: StorageKeys.TableViewer }
  )
);
