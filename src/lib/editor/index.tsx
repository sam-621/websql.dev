import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { FC } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import { StorageKeys } from '../constants/storage.constants';
import { useDebouncedCallback } from 'use-debounce';

export const Editor: FC<Props> = ({ onChange, onMount }) => {
  const { value: defaultCodeValue, setValue } = useLocalStorage(StorageKeys.Code, '');

  const saveCode = useDebouncedCallback((code: string) => {
    setValue(code);
  }, 300);

  return (
    <MonacoEditor
      defaultValue={defaultCodeValue}
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
      onChange={value => {
        saveCode(value ?? '');
        onChange?.(value);
      }}
      onMount={editor => {
        onChange?.(editor.getValue()); // set initial value
        onMount?.(editor);
      }}
    />
  );
};

type Props = {
  onChange?: (value: string | undefined) => void;
  onMount?: (editor: unknown) => void;
};

export type EditorRef = Monaco;
