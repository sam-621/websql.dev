export type QueryResult =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      rows: Record<string, unknown>[];
      rowCount: number;
    };
