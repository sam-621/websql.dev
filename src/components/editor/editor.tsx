'use client';
import MonacoEditor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { useConnectionStore } from '../connection/connection.store';
import { executeQuery } from './execute-query';
import { Button } from '../ui/button';

export const Editor = () => {
  const [code, setCode] = useState<string>(`SELECT * FROM users WHERE name = 'John Doe';`);
  const connections = useConnectionStore(state => state.connections);
  const selectedConnection = useConnectionStore(state => state.selectedConnection);
  const selectConnectionInStore = useConnectionStore(state => state.selectConnection);

  useEffect(() => {
    const connection = connections[0];

    if (connection) {
      selectConnectionInStore(connection);
    }
  }, []);

  const execute = async () => {
    if (!selectedConnection) {
      return;
    }

    const result = await executeQuery(selectedConnection, code);

    console.log(result);
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
          <Button onClick={execute}>Execute</Button>
        </div>
      </div>
      <div className="h-[calc(100%-60px)]">
        <MonacoEditor
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
          value={code}
          onChange={value => setCode(value!)}
        />
      </div>
    </div>
  );
};
