import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { Trash2Icon } from 'lucide-react';
import { Connection } from '@/lib/types/connection.type';
import { useRemoveConnection } from './use-remove-connection';

export const RemoveConnectionButton: FC<Props> = ({ connection }) => {
  const { handleRemove, isOpen, setIsOpen } = useRemoveConnection(connection);

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-muted-foreground">
          <Trash2Icon size={16} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove {connection.name}</DialogTitle>
          <DialogDescription>
            You will not be able to recover this connection. This cannot be undone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleRemove}>Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  connection: Connection;
};
