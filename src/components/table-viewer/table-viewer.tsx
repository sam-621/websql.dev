'use client';

import { RefreshCcwIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useBuildQuery } from './build-query/use-build-query';
import { useEffect, useState } from 'react';
import { ResultTable } from './result-table';
import { LoaderSpiner } from '@/lib/loaders/loader-spinner';
import { TableViewerSelectFields } from './table-viewer-actions/table-viewer-select-fields';
import { TableViewerLimit } from './table-viewer-actions/table-viewer-limit';

export const TableViewer = () => {
  const { isLoading, buildQuery } = useBuildQuery();

  const [result, setResult] = useState<Record<string, unknown>[]>([]);
  const [rows, setRows] = useState<string[]>([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await buildQuery();
      const resultSet = result?.rows ?? [];

      const rows = resultSet.length ? Object.keys(resultSet[0]).map(key => key) : [];

      setResult(resultSet);
      setRows(rows);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  return (
    <div className="mt-2">
      <header className="flex justify-between items-center gap-4 px-3 pb-2">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="secondary" onClick={() => setRefetch(refetch + 1)}>
            <RefreshCcwIcon size={16} />
          </Button>
          <TableViewerSelectFields fields={rows} />
          <TableViewerLimit />
        </div>
        <div>
          <Button size="sm">Add record</Button>
        </div>
      </header>
      <div className="h-[calc(100vh-84px)] overflow-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoaderSpiner size={32} />
          </div>
        ) : (
          <ResultTable result={result} rows={rows} />
        )}
      </div>
    </div>
  );
};
