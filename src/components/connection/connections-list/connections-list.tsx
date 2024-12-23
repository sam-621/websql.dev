'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { StorageKeys } from '@/lib/constants/storage.constants';
import { Connection } from '@/lib/types/connection.type';
import { UpsertConnectionButton } from '../upsert-connection/upsert-connection-button';

export const ConnectionsList = () => {
  const { value: connections } = useLocalStorage<Connection[]>(StorageKeys.Connections, []);

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
            <p>{connection.name}</p>
          </div>
          <div>
            <UpsertConnectionButton
              trigger={
                <Button
                  className="opacity-0 group-hover:opacity-100 transition-all"
                  size="icon"
                  variant="link"
                >
                  <PencilIcon size={16} />
                </Button>
              }
              connection={connection}
            />

            <Button
              className="opacity-0 group-hover:opacity-100 transition-all"
              size="icon"
              variant="link"
            >
              <Trash2Icon size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
