import { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { PageErrorBoundary } from '../components/tailwind-ui';

import '../../styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

function C6H6App({ Component, pageProps }: AppProps) {
  return (
    <PageErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </PageErrorBoundary>
  );
}

export default C6H6App;
