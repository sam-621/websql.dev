import { useState, useTransition } from 'react';
import { useTableViewerStore } from '../table-viewer.store';
import { useConnectionStore } from '@/components/connection/connection.store';
import { removeRecords } from './remove-record';
import { notification } from '@/lib/notification/notifications';
import { queryClient } from '@/app/query-client';
import { CacheKeys } from '@/lib/constants/cache.constants';

export const useRemoveRecords = (rows: Record<string, unknown>[], onFinish: () => void) => {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const selectedTab = useTableViewerStore(state => state.selected);
  const connections = useConnectionStore(state => state.connections);
  const tabConfig = useTableViewerStore(
    state => state.tabs.find(tab => tab.table === selectedTab?.table)?.config
  );

  const handleRemove = () => {
    startTransition(async () => {
      if (!selectedTab) return;

      const connection = connections.find(c => c.id === selectedTab?.connection);

      if (!connection) return;

      const primaryKeys = rows.map(row => row[tabConfig?.primaryKey ?? '']) as string[];

      const result = await removeRecords(connection, {
        primaryKeys,
        table: selectedTab?.table
      });

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      await queryClient.invalidateQueries(
        CacheKeys.TableViewer(selectedTab.table, selectedTab.connection)
      );
      notification.success('Records removed successfully');
      onFinish();
      setIsOpen(false);
    });
  };

  return {
    isLoading,
    isOpen,
    setIsOpen,
    handleRemove
  };
};
