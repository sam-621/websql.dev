export type Connection = {
  id: string;
  type: 'postgresql' | 'mysql';
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};
