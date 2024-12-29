import { useConnectionStore } from '@/components/connection/connection.store';
import { buildQuery } from './build-query';
import { useTableViewerStore } from '../table-viewer.store';
import { notification } from '@/lib/notification/notifications';
import { useQuery } from 'react-query';
import { CacheKeys } from '@/lib/constants/cache.constants';

export const useBuildQuery = () => {
  const connections = useConnectionStore(state => state.connections);
  const selectedTable = useTableViewerStore(state => state.selected);
  const allTabs = useTableViewerStore(state => state.tabs);
  const addConfig = useTableViewerStore(state => state.addConfig);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: CacheKeys.TableViewer(selectedTable?.table ?? '', selectedTable?.connection ?? ''),
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
        const columns = result?.columns?.map(col => col.name);

        addConfig(selectedTable.connection, selectedTable.table, {
          fields: columns,
          allFields: columns,
          limit: 100,
          primaryKey: result.primaryKey ?? ''
        });
      }

      return {
        columns: result.columns,
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
