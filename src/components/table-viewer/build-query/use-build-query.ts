import { useConnectionStore } from '@/components/connection/connection.store';
import { buildQuery } from './build-query';
import { useTableViewerStore } from '../table-viewer.store';
import { notification } from '@/lib/notification/notifications';
import { useQuery } from 'react-query';

export const useBuildQuery = () => {
  const connections = useConnectionStore(state => state.connections);
  const selectedTable = useTableViewerStore(state => state.selected);
  const allTabs = useTableViewerStore(state => state.tabs);
  const addConfig = useTableViewerStore(state => state.addConfig);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: `build-query-${selectedTable?.table} ${selectedTable?.connection}`,
    queryFn: async () => {
      if (!selectedTable) return;

      const connection = connections.find(c => c.id === selectedTable.connection);

      if (!connection) return;

      const tabConfig = allTabs.find(tab => tab.table === selectedTable.table)?.config;

      const result = await buildQuery(connection, {
        table: selectedTable.table,
        fields: tabConfig?.fields,
        limit: tabConfig?.limit
      });

      if (result.error) {
        notification.error(result.error);
        return;
      }

      if (!tabConfig?.allFields.length) {
        const rows = result?.rows?.length ? Object.keys(result.rows[0]).map(key => key) : [];
        addConfig(selectedTable.connection, selectedTable.table, {
          fields: rows,
          allFields: rows,
          limit: 100,
          primaryKey: result.primaryKey ?? ''
        });
      }

      return {
        rows: result.rows
      };
    }
  });

  return {
    data,
    isLoading: isLoading || isRefetching,
    refetch
  };
};
