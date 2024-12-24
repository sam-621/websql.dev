import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { FC } from 'react';

export const Editor: FC<Props> = ({ onChange, onMount }) => {
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
      onMount={onMount}
      onChange={onChange}
    />
  );
};

type Props = {
  onChange: (value: string | undefined) => void;
  onMount: (editor: unknown) => void;
};

export type EditorRef = Monaco;
