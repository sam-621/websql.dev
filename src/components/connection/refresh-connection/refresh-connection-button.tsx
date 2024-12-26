'use client';

import { Button } from '@/components/ui/button';
import { RefreshCcwIcon } from 'lucide-react';
import { useRefreshConnection } from './use-refresh-connection';
import { cn } from '@/lib/utils';

export const RefreshConnectionButton = () => {
  const { isLoading, refreshConnections } = useRefreshConnection();

  return (
    <Button size="icon" variant="outline" onClick={refreshConnections}>
      <RefreshCcwIcon size={16} className={cn(isLoading && 'animate-spin')} />
    </Button>
  );
};
