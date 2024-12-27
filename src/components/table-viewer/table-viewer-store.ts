import { StorageKeys } from '@/lib/constants/storage.constants';
import { Connection } from '@/lib/types/connection.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Schema = {
  tabs: { connection: Connection['id']; table: string }[];
  selected: { connection: Connection['id']; table: string } | null;
  select: (connection: Connection['id'], table: string) => void;
  removeTab: (connection: Connection['id'], table: string) => void;
};

export const useTableViewerStore = create<Schema>()(
  persist(
    set => ({
      tabs: [],
      selected: null,
      select(connection, table) {
        set(state => {
          const alreadySelected = state.tabs.some(
            tab => tab.connection === connection && tab.table === table
          );

          if (alreadySelected) {
            return {
              selected: { connection, table },
              tabs: state.tabs
            };
          }

          return {
            selected: { connection, table },
            tabs: [...state.tabs, { connection, table }]
          };
        });
      },
      removeTab(connection, table) {
        set(state => {
          const allTabs = state.tabs;
          const selectedTab = state.selected;

          const tabToRemoveIndex = allTabs.findIndex(
            tab => tab.connection === connection && tab.table === table
          );
          const tabToRemoveIsSelected =
            selectedTab?.connection === connection && selectedTab?.table === table;

          const newTabs = allTabs.filter(
            tab => tab.connection !== connection || tab.table !== table
          );

          if (tabToRemoveIsSelected) {
            const newSelectedTab =
              newTabs.length >= 1
                ? newTabs[tabToRemoveIndex] ??
                  newTabs[tabToRemoveIndex + 1] ??
                  newTabs[tabToRemoveIndex - 1] ??
                  newTabs[0]
                : null;

            console.log({
              newSelectedTab,
              newTabs
            });

            return {
              selected: newSelectedTab,
              tabs: newTabs
            };
          }

          return {
            tabs: newTabs
          };
        });
      }
    }),
    { name: StorageKeys.TableViewer }
  )
);
