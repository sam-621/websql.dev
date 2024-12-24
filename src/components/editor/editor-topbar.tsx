import { FC } from 'react';
import { useConnectionStore } from '../connection/connection.store';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select } from '../ui/select';

export const EditorTopbar: FC<Props> = ({ canExecute, isLoading, execute }) => {
  const { connections, selectedConnection } = useConnectionStore(state => state);
  const selectConnectionInStore = useConnectionStore(state => state.selectConnection);

  return (
    <div className="h-[60px] p-3 w-full bg-muted flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Label htmlFor="connection">Connection:</Label>
        <Select
          id="connection"
          onChange={e => selectConnectionInStore(connections.find(c => c.id === e.target.value)!)}
          value={selectedConnection?.id ?? ''}
        >
          <option value="" disabled>
            Select connection
          </option>
          {connections.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Button disabled={!canExecute || isLoading} isLoading={isLoading} onClick={execute}>
          Execute
        </Button>
      </div>
    </div>
  );
};

type Props = {
  canExecute: boolean;
  isLoading: boolean;
  execute: () => void;
};
