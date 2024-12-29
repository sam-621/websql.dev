export type Connection = {
  id: string;
  type: 'postgresql' | 'mysql';
  name: string;
  url: string;
  tables: string[];
};

export type CreateConnectionInput = Omit<Connection, 'id'>;

export type ConnectionConfig = Omit<Connection, 'id' | 'tables' | 'name'>;

export type TableColumn = {
  name: string;
  required: boolean;
  default: string;
};
