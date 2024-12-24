'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { UpsertConnectionButton } from './upsert-connection/upsert-connection-button';
import { RemoveConnectionButton } from './remove-connection-button';
import { EXAMPLE_CONNECTIONS, useConnectionStore } from './connection.store';
import { useEffect } from 'react';
import { getLocalStorageItem } from '@/lib/utils/local-storage.utils';
import { StorageKeys } from '@/lib/constants/storage.constants';

export const ConnectionsList = () => {
  const connections = useConnectionStore(state => state.connections);
  const createConnectionInStorage = useConnectionStore(state => state.create);

  useEffect(function createExampleConnections() {
    const contextStorage = getLocalStorageItem(StorageKeys.Connections);

    // First time visiting the app
    if (contextStorage === null) {
      EXAMPLE_CONNECTIONS.forEach(connection => createConnectionInStorage(connection));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-3 p-3">
      {connections.map(connection => (
        <div key={connection.id} className={cn('group flex items-center justify-between')}>
          <div className="flex items-center gap-1">
            <Image
              src={connection.type === 'postgresql' ? 'postgresql.svg' : 'mysql.svg'}
              alt="database icon"
              width={32}
              height={32}
            />
            {/* className="text-sm text-nowrap text-ellipsis whitespace-nowrap overflow-hidden" */}
            <p>{connection.name}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
            <UpsertConnectionButton
              trigger={
                <Button size="icon" variant="outline">
                  <PencilIcon size={16} />
                </Button>
              }
              connection={connection}
            />

            <RemoveConnectionButton connection={connection} />
          </div>
        </div>
      ))}
    </div>
  );
};
