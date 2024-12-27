import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export const ResultTable: FC<Props> = ({ rows, result }) => {
  return (
    <Table>
      <TableHeader className="h-12 bg-muted border-t">
        <TableRow className="h-full divide-x">
          {rows.map(row => (
            <TableHead key={row}>{row}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="border-b">
        {result.map(r => (
          <TableRow key={Object.values(r).join('')} className="divide-x">
            {rows.map(row => {
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
