import { FC, useMemo } from 'react';
import { ResultTable } from '../table-viewer/result-table';

export const PlaygroundResultPanel: FC<Props> = ({ error, result, isLoading }) => {
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
        {result.length > 0 && <ResultTable rows={rows} result={result} />}
        {result.length === 0 && !isLoading && !error && (
          <div className="flex justify-center items-center h-full">
            <p className="jetbrains_font">No results</p>
          </div>
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
