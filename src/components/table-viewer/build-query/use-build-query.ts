import { useConnectionStore } from '@/components/connection/connection.store';
import { useState } from 'react';
import { buildQuery } from './build-query';
import { useTableViewerStore } from '../table-viewer-store';
import { notification } from '@/lib/notification/notifications';

export const useBuildQuery = () => {
  const [isLoading, setIsLoading] = useState(false);

  const connections = useConnectionStore(state => state.connections);
  const selectedTable = useTableViewerStore(state => state.selected);
  const allTabs = useTableViewerStore(state => state.tabs);
  const addConfig = useTableViewerStore(state => state.addConfig);

  const exec = async () => {
    if (!selectedTable) return;

    const connection = connections.find(c => c.id === selectedTable.connection);

    if (!connection) return;

    const tabConfig = allTabs.find(tab => tab.table === selectedTable.table)?.config;

    setIsLoading(true);

    const result = await buildQuery(connection, {
      table: selectedTable.table,
      fields: tabConfig?.fields
    });

    if (result.error) {
      notification.error(result.error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    if (!tabConfig?.allFields.length) {
      const rows = result?.rows?.length ? Object.keys(result.rows[0]).map(key => key) : [];
      addConfig(selectedTable.connection, selectedTable.table, { fields: rows, allFields: rows });
    }

    return {
      rows: result.rows
    };
  };

  return {
    isLoading,
    buildQuery: exec
  };
};
