import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useTableViewerStore } from './table-viewer.store';

export const ResultTable: FC<Props> = ({ rows, result }) => {
  const tabConfig = useTableViewerStore(
    state => state.tabs.find(t => t.table === state.selected?.table)?.config
  );

  const isPrimaryKeySelected = tabConfig?.fields?.includes(tabConfig?.primaryKey);

  return (
    <Table>
      <TableHeader className="h-12 bg-muted border-t">
        <TableRow className="h-full divide-x">
          {rows
            .filter(r => (isPrimaryKeySelected ? true : r !== tabConfig?.primaryKey))
            .map(row => (
              <TableHead key={row}>{row}</TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody className="border-b">
        {result.map(r => (
          <TableRow key={Object.values(r).join('')} className="divide-x">
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
        ))}
      </TableBody>
    </Table>
  );
};

type Props = {
  rows: string[];
  result: Record<string, unknown>[];
};
