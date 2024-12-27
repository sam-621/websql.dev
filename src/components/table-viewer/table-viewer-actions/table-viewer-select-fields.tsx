import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FC, useMemo } from 'react';
import { useTableViewerStore } from '../table-viewer.store';

export const TableViewerSelectFields: FC<Props> = ({ fields }) => {
  const selected = useTableViewerStore(state => state.selected);
  const tabs = useTableViewerStore(state => state.tabs);
  const addConfig = useTableViewerStore(state => state.addConfig);

  const tabConfig = useMemo(
    () =>
      tabs.find(t => t.table === selected?.table && t.connection === selected.connection)?.config,
    [selected, tabs]
  );

  const allFields = tabConfig?.allFields ?? fields ?? [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Fields</Button>
      </PopoverTrigger>
      <PopoverContent className="grid gap-3">
        {allFields.map(field => (
          <div key={field} className="flex items-center gap-2">
            <Checkbox
              id={field}
              checked={tabConfig?.fields.includes(field)}
              onCheckedChange={value => {
                const allFieldsSelected = tabConfig?.fields ?? [];
                const newFields = value
                  ? [...allFieldsSelected, field]
                  : allFieldsSelected.filter(f => f !== field);

                // Sort fields based on the order they are in the allFields array
                // This is to keep the order of the fields consistent
                const reorderedArray = newFields.sort((a, b) => {
                  return allFields.indexOf(a) - allFields.indexOf(b);
                });

                addConfig(selected?.connection ?? '', selected?.table ?? '', {
                  fields: reorderedArray
                });
              }}
            />
            <Label htmlFor={field}>{field}</Label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

type Props = {
  fields: string[];
};
