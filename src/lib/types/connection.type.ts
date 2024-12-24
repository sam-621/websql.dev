export type Connection = {
  id: string;
  type: 'postgresql' | 'mysql';
  name: string;
  url: string;
};

export type ConnectionConfig = Omit<Connection, 'id'>;
