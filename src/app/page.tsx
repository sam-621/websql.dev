import { ConnectionsList } from '@/components/connection/connections-list';
import { UpsertConnectionButton } from '@/components/connection/upsert-connection/upsert-connection-button';
import { Playground } from '@/components/playground';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { DatabaseIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-cols-[auto,1fr] h-screen">
      <aside className="bg-muted w-fit border-r flex-col justify-between hidden md:flex">
        <div className="flex flex-col items-center gap-6 p-3">
          <Image src="/logo.svg" alt="Logo" width={39} height={39} />
          <div className="p-3 bg-muted-foreground/10 rounded-full">
            <DatabaseIcon size={24} className="text-muted-foreground" />
          </div>
        </div>
        <div className="p-3 flex justify-center">
          <a href="https://github.com/sam-621/websql.dev" target="_blank">
            <Image src="/github.svg" width={32} height={32} alt="Github logo" priority />
          </a>
        </div>
      </aside>
      <main className="w-full md:max-w-[calc(100vw-73px)]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} className="divide-y bg-muted" minSize={20}>
            <div className="flex items-center justify-between gap-2 p-3">
              <h3 className="jetbrains_font">Connections</h3>
              <UpsertConnectionButton
                trigger={
                  <Button size="icon" variant="outline">
                    <PlusIcon size={16} />
                  </Button>
                }
              />
            </div>
            <ConnectionsList />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75} className="h-full">
            <Playground />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
