'use client';

import { Button } from '@/components/ui/button';
import { RefreshCcwIcon } from 'lucide-react';
import { useRefreshConnection } from './use-refresh-connection';
import { cn } from '@/lib/utils';
import { useConnectionStore } from '../connection.store';

export const RefreshConnectionButton = () => {
  const connections = useConnectionStore(state => state.connections);
  const { isLoading, refreshConnections } = useRefreshConnection();

  return (
    <Button
      disabled={isLoading || !connections.length}
      size="icon"
      variant="outline"
      onClick={refreshConnections}
    >
      <RefreshCcwIcon size={16} className={cn(isLoading && 'animate-spin')} />
    </Button>
  );
};
