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
import { useRemoveRecords } from './use-remove-records';

export const RemoveRecordsButton: FC<Props> = ({ rows, onFinish }) => {
  const { isOpen, setIsOpen, isLoading, handleRemove } = useRemoveRecords(rows, onFinish);

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete {rows.length}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Remove {rows.length} {rows.length === 1 ? 'Record' : 'Records'}
          </DialogTitle>
          <DialogDescription>
            By executing this action, you will remove {rows.length}{' '}
            {rows.length === 1 ? 'record' : 'records'} from the database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button isLoading={isLoading} onClick={handleRemove}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  rows: Record<string, unknown>[];
  onFinish: () => void;
};
