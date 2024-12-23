'use client';
import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';

export const Editor = () => {
  const [code, setCode] = useState<string>(`SELECT * FROM users WHERE name = 'John Doe';`);

  return (
    <MonacoEditor
      height="100vh"
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false
        },
        padding: {
          top: 10
        }
      }}
      language={'sql'}
      theme="vs-dark"
      value={code}
      onChange={value => setCode(value!)}
    />
  );
};
