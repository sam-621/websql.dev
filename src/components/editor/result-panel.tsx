import { FC, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export const ResultPanel: FC<Props> = ({ error, result, isLoading }) => {
  const rows = useMemo(
    () => (result.length ? Object.keys(result[0]).map(key => key) : []),
    [result]
  );

  return (
    <div className="h-full">
      <div className="bg-muted p-1">
        <p className="jetbrains_font">Results</p>
      </div>
      <div className="h-[calc(100%-32px)] overflow-scroll">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <p className="jetbrains_font">Loading...</p>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-full">
            <p className="text-destructive jetbrains_font">{error}</p>
          </div>
        )}
        {result.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

type Props = {
  isLoading: boolean;
  result: Record<string, unknown>[];
  error: string;
};
