'use client';

import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider as RQueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <RQueryClientProvider client={queryClient}>{children}</RQueryClientProvider>;
};
