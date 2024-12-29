export const CacheKeys = {
  TableViewer: (table: string, connection: string) => `build:query:${table}:${connection}`
};
