'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ServerIcon } from 'lucide-react';
import { FC } from 'react';
import { UpsertConnectionForm } from './upsert-connection-form';
import { Connection } from '@/lib/types/connection.type';

export const UpsertConnectionButton: FC<Props> = ({ trigger: Trigger, connection }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="!max-w-none w-[520px]">
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <ServerIcon className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Create connection</DialogTitle>
            <DialogDescription className="text-left">
              Connection settings are stored in your local browser.
            </DialogDescription>
          </DialogHeader>
        </div>

        <UpsertConnectionForm connection={connection} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  trigger: React.ReactNode;
  connection?: Connection;
};
