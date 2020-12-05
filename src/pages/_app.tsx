import { AppProps } from 'next/app';
import React from 'react';

import { PageErrorBoundary } from '../components/tailwind-ui';

import '../../styles/index.css';

function C6H6App({ Component, pageProps }: AppProps) {
  return (
    <PageErrorBoundary>
      <Component {...pageProps} />
    </PageErrorBoundary>
  );
}

export default C6H6App;
