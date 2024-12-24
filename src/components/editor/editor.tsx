'use client';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { useConnectionStore } from '../connection/connection.store';
import { executeQuery } from './execute-query';
import { Button } from '../ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { ResultPanel } from './result-panel';

export const Editor = () => {
  const monacoRef = useRef<Monaco>(null);
  const [canExecute, setCanExecute] = useState(false);

  const [firstQuery, setFirstQuery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState('');
  // const [code, setCode] = useState<string>(`SELECT * FROM product`);
  const connections = useConnectionStore(state => state.connections);
  const selectedConnection = useConnectionStore(state => state.selectedConnection);
  const selectConnectionInStore = useConnectionStore(state => state.selectConnection);

  useEffect(function setInitialConnection() {
    const connection = connections[0];

    if (connection) {
      selectConnectionInStore(connection);
    }
  }, []);

  useEffect(
    function CtrlEnter() {
      if (!selectedConnection) {
        return;
      }

      document.addEventListener('keydown', executeOnCtrlEnter);
      return () => {
        document.removeEventListener('keydown', executeOnCtrlEnter);
      };
    },
    [selectedConnection]
  );

  const execute = async () => {
    const selectedCode = monacoRef.current
      .getModel()
      .getValueInRange(monacoRef.current.getSelection());
    const allCode = monacoRef.current.getModel().getValue();

    const code = selectedCode || allCode;

    if (!code?.length) {
      return;
    }

    if (!selectedConnection) {
      return;
    }

    setError('');
    setResult([]);

    setIsLoading(true);
    const result = await executeQuery(selectedConnection, code);

    if (!result.success) {
      setFirstQuery(true);
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setFirstQuery(true);
    setResult(result.rows);
    setIsLoading(false);
  };

  const executeOnCtrlEnter = async (e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      await execute();
    }
  };

  return (
    <div className="flex flex-col h-full divide-y">
      <div className="h-[60px] p-3 w-full bg-muted flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor="connection">Connection:</Label>
          <Select
            id="connection"
            onChange={e => selectConnectionInStore(connections.find(c => c.id === e.target.value)!)}
          >
            {connections.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Button disabled={!canExecute || isLoading} isLoading={isLoading} onClick={execute}>
            Execute
          </Button>
        </div>
      </div>
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
              onChange={value => setCanExecute(!!value?.length)}
            />
          </ResizablePanel>
          <ResizableHandle />
          {firstQuery && (
            <ResizablePanel minSize={4}>
              <ResultPanel error={error} result={result} isLoading={isLoading} />
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
