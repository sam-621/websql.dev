import { useTableViewerStore } from '@/components/table-viewer/table-viewer.store';
import { Connection } from '@/lib/types/connection.type';
import { TableIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

export const TableList: FC<Props> = ({ connection }) => {
  const router = useRouter();
  const selectTable = useTableViewerStore(state => state.select);

  const handleClick = (table: string) => {
    selectTable(connection.id, table);
    router.push('/table-viewer');
  };

  return connection.tables.map(table => (
    <button
      key={table}
      className="flex items-center gap-2 pl-6 pr-3 py-1 hover:bg-background w-full"
      onClick={() => handleClick(table)}
    >
      <TableIcon size={16} />
      <p className="text-sm text-nowrap text-ellipsis whitespace-nowrap overflow-hidden">{table}</p>
    </button>
  ));
};

type Props = {
  connection: Connection;
};
