import { ConnectionsList } from '@/components/connection/connections-list/connections-list';
import { UpsertConnectionButton } from '@/components/connection/upsert-connection/upsert-connection-button';
import { Editor } from '@/components/editor/editor';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { DatabaseIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-cols-[auto,1fr]">
      <aside className="bg-muted h-screen w-fit border-r">
        <div className="flex flex-col items-center gap-6 p-3">
          <Image src="/logo.svg" alt="Logo" width={39} height={39} />
          <div className="p-3 bg-muted-foreground/10 rounded-full">
            <DatabaseIcon size={24} className="text-muted-foreground" />
          </div>
        </div>
      </aside>
      <main>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} className="divide-y bg-muted" minSize={20}>
            <div className="flex items-center justify-between p-3">
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
            <Editor />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
