import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTableViewerStore } from '../table-viewer-store';
import { useMemo } from 'react';

export const TableViewerLimit = () => {
  const selected = useTableViewerStore(state => state.selected);
  const tabs = useTableViewerStore(state => state.tabs);
  const addConfig = useTableViewerStore(state => state.addConfig);

  const tabConfig = useMemo(
    () =>
      tabs.find(t => t.table === selected?.table && t.connection === selected.connection)?.config,
    [selected, tabs]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Limit</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1">
        <Label>Limit</Label>
        <Input
          type="number"
          defaultValue={tabConfig?.limit ?? 100}
          onChange={e => {
            const limit = parseInt(e.target.value);
            addConfig(selected?.connection ?? '', selected?.table ?? '', { limit });
          }}
        />
      </PopoverContent>
    </Popover>
  );
};