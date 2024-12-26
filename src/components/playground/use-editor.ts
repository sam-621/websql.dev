import { RefObject, useEffect, useState } from 'react';
import { useConnectionStore } from '../connection/connection.store';
import { executeQuery } from './execute-query';
import { EditorRef } from '@/lib/editor';

export const useEditor = (editor: RefObject<EditorRef>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState('');

  const selectedConnection = useConnectionStore(state => state.selectedConnection);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedConnection]
  );

  const executeOnCtrlEnter = async (e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      await execute();
    }
  };

  const execute = async () => {
    const selectedCode = editor.current.getModel().getValueInRange(editor.current.getSelection());
    const allCode = editor.current.getModel().getValue();

    const code: string = selectedCode || allCode;

    if (!code?.length) {
      return;
    }

    if (!selectedConnection) {
      return;
    }

    // Sql clients does not support multiple queries, so we split them to run one by one
    const queries = code.replaceAll('Go', 'go').split('go').filter(Boolean);

    setError('');
    setResult([]);

    setIsLoading(true);
    const result = await executeQuery(selectedConnection, queries);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    if (result.affectedRows) {
      setResult([{ affectedRows: result.affectedRows }]);
      setIsLoading(false);
      return;
    }

    setResult(result.rows);
    setIsLoading(false);
  };

  return {
    isLoading,
    result,
    error,
    execute
  };
};
