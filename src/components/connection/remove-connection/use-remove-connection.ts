import { Connection } from '@/lib/types/connection.type';
import { useState } from 'react';
import { useConnectionStore } from '../connection.store';
import { useTableViewerStore } from '@/components/table-viewer/table-viewer.store';
import { notification } from '@/lib/notification/notifications';

export const useRemoveConnection = (connection: Connection) => {
  const [isOpen, setIsOpen] = useState(false);
  const removeConnectionFromStore = useConnectionStore(state => state.remove);
  const removeAllTabsByConnection = useTableViewerStore(state => state.removeAllTabsByConnection);

  const handleRemove = () => {
    removeConnectionFromStore(connection.id);
    // Remove all tabs that are associated with this connection
    removeAllTabsByConnection(connection.id);

    notification.success(`Connection ${connection.name} removed`);
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    handleRemove
  };
};
