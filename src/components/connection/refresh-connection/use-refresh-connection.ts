import { refreshConnections } from './refresh-connections';
import { useConnectionStore } from '../connection.store';
import { notification } from '@/lib/notification/notifications';
import { useTransition } from 'react';

export const useRefreshConnection = () => {
  const [isLoading, startTransition] = useTransition();
  const connections = useConnectionStore(state => state.connections);
  const updateConnectionInStore = useConnectionStore(state => state.update);

  const exec = () => {
    startTransition(async () => {
      const results = await refreshConnections(connections);

      const isAnyWithError = results.some(r => r.error);

      if (isAnyWithError) {
        notification.error('Error refreshing connections');
        return;
      }

      results.forEach(r => {
        if (!r.connection) return;

        updateConnectionInStore(r.connection);
      });
    });
  };

  return {
    refreshConnections: exec,
    isLoading
  };
};
