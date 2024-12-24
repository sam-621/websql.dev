'use client';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { useMemo, useRef, useState } from 'react';
import { useConnectionStore } from '../connection/connection.store';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { ResultPanel } from './result-panel';
import { EditorTopbar } from './editor-topbar';
import { useEditor } from './use-editor';

export const Editor = () => {
  const monacoRef = useRef<Monaco>(null);
  const [hasCode, setHasCode] = useState(false);

  const selectedConnection = useConnectionStore(state => state.selectedConnection);

  const { isLoading, result, error, execute } = useEditor(monacoRef);

  const canExecute = useMemo(
    () => Boolean(hasCode && selectedConnection),
    [hasCode, selectedConnection]
  );

  return (
    <div className="flex flex-col h-full divide-y">
      <EditorTopbar canExecute={canExecute} isLoading={isLoading} execute={execute} />
      <div className="h-[calc(100%-60px)]">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel>
            <MonacoEditor
              onMount={editor => (monacoRef.current = editor)}
              className="bg-background"
              options={{
                fontSize: 14,
                scrollBeyondLastLine: false,
                minimap: {
                  enabled: false
                },
                padding: {
                  top: 18
                },
                lineNumbersMinChars: 3
              }}
              language={'sql'}
              theme="vs-dark"
              onChange={value => setHasCode(!!value?.length)}
            />
          </ResizablePanel>
          <ResizableHandle />
          {/* If result is null, it means it hasn't been initialized */}
          {result !== null && (
            <ResizablePanel minSize={4}>
              <ResultPanel error={error} result={result} isLoading={isLoading} />
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
