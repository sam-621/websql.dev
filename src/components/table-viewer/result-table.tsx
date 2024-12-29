import { FC, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useTableViewerStore } from './table-viewer.store';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';

export const ResultTable: FC<Props> = ({ rows, result, onSelectChange }) => {
  const [selected, setSelected] = useState<typeof result>([]);

  const tabConfig = useTableViewerStore(
    state => state.tabs.find(t => t.table === state.selected?.table)?.config
  );

  const isPrimaryKeySelected = tabConfig?.fields?.includes(tabConfig?.primaryKey);
  const columns = rows.length ? rows : tabConfig?.allFields ?? [];

  useEffect(() => {
    onSelectChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  if (!columns.length) {
    return null;
  }

  return (
    <Table>
      <TableHeader className="h-12 bg-muted border-t">
        <TableRow className="h-full divide-x">
          <TableHead className="w-16 text-center !px-2 text-nowrap">
            <Checkbox
              checked={Boolean(selected.length)}
              onCheckedChange={value => {
                if (value) {
                  setSelected(result);
                } else {
                  setSelected([]);
                }
              }}
            />
          </TableHead>
          {columns
            .filter(r => (isPrimaryKeySelected ? true : r !== tabConfig?.primaryKey))
            .map(row => (
              <TableHead key={row}>{row}</TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody className="border-b">
        {result.map(r => {
          const isSelected = selected.find(
            s => Object.values(s).join('') === Object.values(r).join('')
          );

          return (
            <TableRow
              key={Object.values(r).join('')}
              className={cn('divide-x', isSelected && '!bg-muted')}
            >
              <TableCell className="w-16 text-center !px-2 text-nowrap">
                <Checkbox
                  checked={!!isSelected}
                  onCheckedChange={value => {
                    if (value) {
                      setSelected([...selected, r]);
                    } else {
                      setSelected(
                        selected.filter(
                          s => Object.values(s).join('') !== Object.values(r).join('')
                        )
                      );
                    }
                  }}
                />
              </TableCell>
              {rows.map(row => {
                // Hide primary key if it's not selected in fields list
                if (!isPrimaryKeySelected && row === tabConfig?.primaryKey) {
                  return null;
                }

                return (
                  <TableCell key={row} className="text-nowrap">
                    {String(r[row])}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

type Props = {
  rows: string[];
  result: Record<string, unknown>[];
  onSelectChange: (selected: Record<string, unknown>[]) => void;
};
