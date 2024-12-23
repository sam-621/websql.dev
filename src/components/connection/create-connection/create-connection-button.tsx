// Dependencies: pnpm install lucide-react

'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { PlusIcon, ServerIcon } from 'lucide-react';
import { useRef } from 'react';
import { CreateConnectionForm } from './create-connection-form';

export const CreateConnectionButton = () => {
  const lastInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <PlusIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="!max-w-none w-[520px]"
        onOpenAutoFocus={e => {
          e.preventDefault();
          lastInputRef.current?.focus();
        }}
      >
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

        <CreateConnectionForm />
      </DialogContent>
    </Dialog>
  );
};
