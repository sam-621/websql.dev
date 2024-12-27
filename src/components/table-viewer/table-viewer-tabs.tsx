'use client';

import { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useTableViewerStore } from './table-viewer-store';
import { TableIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TableViewer } from './table-viewer';

export const TableViewerTabs = () => {
  const {
    selected,
    select: selectTableInStore,
    tabs,
    removeTab
  } = useTableViewerStore(state => state);
  const selectedTab = useMemo(() => (selected ? genTabId(selected) : ''), [selected]);

  if (!tabs.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No tables selected</p>
      </div>
    );
  }

  return (
    <Tabs
      value={selectedTab}
      onValueChange={value => {
        const [connection, table] = value.split('/');
        selectTableInStore(connection, table);
      }}
    >
      <TabsList className="w-full justify-start p-0 rounded-none">
        {tabs.map(tab => (
          <TabsTrigger key={genTabId(tab)} value={genTabId(tab)} className="rounded-none">
            <TableIcon size={16} className="mr-2" />
            {tab.table}
            <XIcon
              size={16}
              className={cn('ml-4 opacity-0', selectedTab === genTabId(tab) && 'opacity-100')}
              onClick={() => removeTab(tab.connection, tab.table)}
            />
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(tab => (
        <TabsContent key={genTabId(tab)} value={genTabId(tab)}>
          <TableViewer />
        </TabsContent>
      ))}
    </Tabs>
  );
};

const genTabId = ({ connection, table }: { connection: string; table: string }) =>
  `${connection}/${table}`;
