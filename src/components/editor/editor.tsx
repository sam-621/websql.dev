'use client';
import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { StorageKeys } from '@/lib/constants/storage.constants';
import { Connection } from '@/lib/types/connection.type';

export const Editor = () => {
  const [code, setCode] = useState<string>(`SELECT * FROM users WHERE name = 'John Doe';`);
  const { value: connections } = useLocalStorage<Connection[]>(StorageKeys.Connections, []);

  return (
    <div className="flex flex-col h-full divide-y">
      <div className="h-[60px] flex items-center gap-2 p-3 w-full bg-muted">
        <Label htmlFor="connection">Connection:</Label>
        <Select id="connection">
          {connections.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
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
