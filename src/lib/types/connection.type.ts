export type Connection =
  | {
      id: string;
      type: 'postgresql';
      name: string;
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
    }
  | {
      id: string;
      type: 'mysql';
      name: string;
      host: string;
      port: number;
      username: string;
      password: string;
    };
