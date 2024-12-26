import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { UpsertConnectionButton } from '../upsert-connection/upsert-connection-button';
import { RefreshConnectionButton } from '../refresh-connection/refresh-connection-button';

export const ConnectionsListHeader = () => {
  return (
    <header className="flex items-center justify-between gap-2 p-3 relative h-[60px]">
      <h3 className="jetbrains_font">Connections</h3>
      <div className="flex items-center gap-2 absolute right-3">
        <RefreshConnectionButton />
        <UpsertConnectionButton
          trigger={
            <Button size="icon" variant="outline">
              <PlusIcon size={16} />
            </Button>
          }
        />
      </div>
    </header>
  );
};
