'use client';

import { RefreshCcwIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useBuildQuery } from './build-query/use-build-query';
import { useMemo, useState } from 'react';
import { ResultTable } from './result-table';
import { TableViewerSelectFields } from './table-viewer-actions/table-viewer-select-fields';
import { TableViewerLimit } from './table-viewer-actions/table-viewer-limit';
import { RemoveRecordsButton } from './remove-records/remove-records-button';
import { cn } from '@/lib/utils';
import { AddRecordButton } from './add-record/add-record-button';

export const TableViewer = () => {
  const { isLoading, data, refetch } = useBuildQuery();

  const [selected, setSelected] = useState<typeof result>([]);

  const [result, columns, activeColumns] = useMemo(() => {
    const resultSet = data?.rows ?? [];
    const columns = data?.columns?.map(column => column.name) ?? [];

    const activeColumns = data?.rows?.length ? Object.keys(data.rows[0]).map(key => key) : [];

    return [resultSet, columns, activeColumns];
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
          <TableViewerSelectFields fields={columns} />
          <TableViewerLimit disabled={!result.length} />
        </div>
        <div className="flex items-center gap-3">
          {Boolean(selected.length) && (
            <RemoveRecordsButton rows={selected} onFinish={() => setSelected([])} />
          )}
          <AddRecordButton />
        </div>
      </header>
      <div className="h-[calc(100vh-84px)] overflow-auto">
        <ResultTable
          result={result}
          rows={activeColumns}
          onSelectChange={rows => setSelected(rows)}
        />
      </div>
    </div>
  );
};
