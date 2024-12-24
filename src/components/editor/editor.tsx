'use client';
import MonacoEditor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { useConnectionStore } from '../connection/connection.store';
import { executeQuery } from './execute-query';
import { Button } from '../ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export const Editor = () => {
  const [rows, setRows] = useState<string[]>([]);
  const [result, setResult] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState('');
  const [code, setCode] = useState<string>(`SELECT * FROM product`);
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
    console.log({
      result
    });

    if (!result.success) {
      setError(result.error);
      return;
    }

    const rows = Object.keys(result.rows[0]).map(key => key);
    setRows(rows);
    setResult(result.rows);
    console.log({ rows });
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
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel>
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
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={4}>
            <div className="h-full">
              <div className="bg-muted p-1">
                <p className="jetbrains_font">Results</p>
              </div>
              <div className="h-[calc(100%-32px)] overflow-scroll">
                {error && error}
                {Boolean(result.length) && (
                  <Table>
                    <TableHeader className="h-12 bg-muted border-t">
                      <TableRow className="h-full divide-x">
                        {rows.map(row => (
                          <TableHead key={row}>{row}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody className="border-b">
                      {result.map(r => (
                        <TableRow key={String(r)} className="divide-x">
                          {rows.map(row => {
                            console.log(r[row]);
                            return (
                              <TableCell key={row} className="text-nowrap">
                                {String(r[row])}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
