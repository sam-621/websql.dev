export type Connection = {
  id: string;
  type: 'postgresql' | 'mysql';
  name: string;
  url: string;
  tables: string[];
};

export type ConnectionConfig = Omit<Connection, 'id' | 'tables' | 'name'>;
