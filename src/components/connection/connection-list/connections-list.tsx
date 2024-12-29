'use client';

import Image from 'next/image';
import { Edit2Icon } from 'lucide-react';
import { useConnectionStore } from '../connection.store';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { UpsertConnectionButton } from '../upsert-connection/upsert-connection-button';
import { RemoveConnectionButton } from '../remove-connection/remove-connection-button';
import { TableList } from './table-list';

export const ConnectionsList = () => {
  const connections = useConnectionStore(state => state.connections);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full h-[calc(100vh-60px)] overflow-y-auto"
      defaultValue="3"
    >
      {connections.map(item => (
        <AccordionItem value={item.id} key={item.id}>
          <div className="relative flex items-center hover:bg-background group transition-all">
            <AccordionTrigger className="justify-normal gap-3 px-3 py-1 text-[15px] leading-6 hover:no-underline [&>svg]:-order-1 w-full">
              <Image
                src={item.type === 'postgresql' ? 'postgresql.svg' : 'mysql.svg'}
                alt="database icon"
                width={16}
                height={16}
              />
              <span className="text-nowrap">{item.name}</span>
            </AccordionTrigger>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 px-3 absolute right-0 bg-background">
              <UpsertConnectionButton
                connection={item}
                trigger={
                  <button className="text-muted-foreground">
                    <Edit2Icon size={16} />
                  </button>
                }
              />
              <RemoveConnectionButton connection={item} />
            </div>
          </div>
          <AccordionContent>
            <TableList connection={item} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
