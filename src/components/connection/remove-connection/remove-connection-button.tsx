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
import { FC, useState } from 'react';
import { removeConnection } from './remove-connection';
import { Trash2Icon } from 'lucide-react';
import { notification } from '@/lib/notification/notifications';
import { Connection } from '@/lib/types/connection.type';

export const RemoveConnectionButton: FC<Props> = ({ connection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRemove = () => {
    removeConnection(connection.id);
    notification.success(`Connection ${connection.name} removed`);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="opacity-0 group-hover:opacity-100 transition-all"
          size="icon"
          variant="link"
        >
          <Trash2Icon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove {connection.name}</DialogTitle>
          <DialogDescription>
            You will not be able to recover this connection. This cannot be undone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button onClick={handleRemove}>Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  connection: Connection;
};
