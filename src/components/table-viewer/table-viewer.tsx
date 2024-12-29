'use client';

import { RefreshCcwIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useBuildQuery } from './build-query/use-build-query';
import { useMemo, useState } from 'react';
import { ResultTable } from './result-table';
import { LoaderSpiner } from '@/lib/loaders/loader-spinner';
import { TableViewerSelectFields } from './table-viewer-actions/table-viewer-select-fields';
import { TableViewerLimit } from './table-viewer-actions/table-viewer-limit';
import { RemoveRecordsButton } from './remove-records/remove-records-button';
import { cn } from '@/lib/utils';

export const TableViewer = () => {
  const { isLoading, data, refetch } = useBuildQuery();

  const [selected, setSelected] = useState<typeof result>([]);

  const [result, rows] = useMemo(() => {
    const resultSet = data?.rows ?? [];
    const rows = resultSet.length ? Object.keys(resultSet[0]).map(key => key) : [];

    return [resultSet, rows];
  }, [data]);

  return (
    <div className="mt-2">
      <header className="flex justify-between items-center gap-4 px-3 pb-2">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => refetch()}
            disabled={isLoading || !result.length}
          >
            <RefreshCcwIcon size={16} className={cn(isLoading && 'animate-spin')} />
          </Button>
          <TableViewerSelectFields fields={rows} />
          <TableViewerLimit disabled={!result.length} />
        </div>
        <div className="flex items-center gap-3">
          {Boolean(selected.length) && (
            <RemoveRecordsButton rows={selected} refetch={() => refetch()} />
          )}
          <Button size="sm">Add record</Button>
        </div>
      </header>
      <div className="h-[calc(100vh-84px)] overflow-auto">
        <ResultTable result={result} rows={rows} onSelectChange={rows => setSelected(rows)} />
      </div>
    </div>
  );
};
