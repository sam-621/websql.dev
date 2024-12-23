'use client';
import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';

export const Editor = () => {
  const [code, setCode] = useState<string>(`SELECT * FROM users WHERE name = 'John Doe';`);

  return (
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
  );
};
