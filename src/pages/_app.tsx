import { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import { PageErrorBoundary } from '../components/tailwind-ui';

import '../../styles/index.css';

const queryClient = new QueryClient();

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
