import { useConnectionStore } from '@/components/connection/connection.store';
import { TableColumn } from '@/lib/types/connection.type';
import { FormEvent, useEffect, useState, useTransition } from 'react';
import { useTableViewerStore } from '../table-viewer.store';
import { getColumns } from './get-columns';
import { notification } from '@/lib/notification/notifications';
import { addRecord } from './add-record';
import { queryClient } from '@/app/query-client';
import { CacheKeys } from '@/lib/constants/cache.constants';

export const useAddRecord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [isFetchingColumns, setIsFetchingColumns] = useState(false);
  const [columns, setColumns] = useState<TableColumn[]>([]);

  const connections = useConnectionStore(state => state.connections);
  const selected = useTableViewerStore(state => state.selected);

  useEffect(() => {
    (async () => {
      if (!selected) {
        return;
      }

      const connection = connections.find(c => c.id === selected.connection);

      if (!connection) {
        return;
      }

      setIsFetchingColumns(true);
      const result = await getColumns(connection, { table: selected.table });
      setIsFetchingColumns(false);

      if (result.error) {
        notification.error(result.error);
        return;
      }

      setColumns(result.columns ?? []);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selected) {
      return;
    }

    const connection = connections.find(c => c.id === selected.connection);

    if (!connection) {
      return;
    }

    startTransition(async () => {
      const result = await addRecord(connection, {
        table: selected.table,
        values: form
      });

      if (result?.error) {
        notification.error(result.error);
        return;
      }

      await queryClient.invalidateQueries(
        CacheKeys.TableViewer(selected.table, selected.connection)
      );
      notification.success('Record added successfully');
      setIsOpen(false);
    });
  };

  return {
    isFetchingColumns,
    columns,
    isLoading,
    isOpen,
    setIsOpen,
    setForm,
    addRecord: exec
  };
};
