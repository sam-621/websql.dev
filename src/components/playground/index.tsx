'use client';

import { useMemo, useRef, useState } from 'react';
import { useConnectionStore } from '../connection/connection.store';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { PlaygroundResultPanel } from './playground-result-panel';
import { PlaygroundTopbar } from './playground-topbar';
import { useEditor } from './use-editor';
import { Editor, EditorRef } from '@/lib/editor';

export const Playground = () => {
  const monacoRef = useRef<EditorRef>(null);
  const [hasCode, setHasCode] = useState(false);

  const selectedConnection = useConnectionStore(state => state.selectedConnection);

  const { isLoading, result, error, execute } = useEditor(monacoRef);

  const canExecute = useMemo(
    () => Boolean(hasCode && selectedConnection),
    [hasCode, selectedConnection]
  );

  return (
    <div className="flex flex-col h-full divide-y">
      <PlaygroundTopbar canExecute={canExecute} isLoading={isLoading} execute={execute} />
      <div className="h-[calc(100%-60px)]">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel>
            <Editor
              onMount={editor => (monacoRef.current = editor)}
              onChange={value => setHasCode(!!value?.length)}
            />
          </ResizablePanel>
          <ResizableHandle />
          {/* If result is null, it means it hasn't been initialized */}
          {result !== null && (
            <ResizablePanel defaultSize={40} minSize={4}>
              <PlaygroundResultPanel error={error} result={result} isLoading={isLoading} />
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
