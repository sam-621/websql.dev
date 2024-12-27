import { StorageKeys } from '@/lib/constants/storage.constants';
import { Connection } from '@/lib/types/connection.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Config = {
  fields: string[];
  allFields: string[];
  limit: number;
  primaryKey: string;
};

type Schema = {
  tabs: { connection: Connection['id']; table: string; config: Config }[];
  selected: { connection: Connection['id']; table: string } | null;
  select: (connection: Connection['id'], table: string) => void;
  removeTab: (connection: Connection['id'], table: string) => void;
  addConfig: (connection: Connection['id'], table: string, config: Partial<Config>) => void;
  removeAllTabsByConnection: (connection: Connection['id']) => void;
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
              selected: { connection, table }
            };
          }

          return {
            selected: { connection, table },
            tabs: [
              ...state.tabs,
              {
                connection,
                table,
                config: { fields: [], allFields: [], limit: 100, primaryKey: '' }
              }
            ]
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

            return {
              selected: newSelectedTab,
              tabs: newTabs
            };
          }

          return {
            tabs: newTabs
          };
        });
      },
      addConfig(connection, table, config) {
        set(state => ({
          tabs: state.tabs.map(tab =>
            tab.connection === connection && tab.table === table
              ? { ...tab, config: { ...tab.config, ...config } }
              : tab
          )
        }));
      },
      removeAllTabsByConnection(connection) {
        set(state => ({
          tabs: state.tabs.filter(tab => tab.connection !== connection),
          selected:
            state.selected?.connection === connection ? state.tabs[0] ?? null : state.selected
        }));
      }
    }),
    { name: StorageKeys.TableViewer }
  )
);
