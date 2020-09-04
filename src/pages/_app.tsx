import React from 'react';

import '../../styles/index.css';
import { RocProvider } from '../contexts/roc';

function MyApp({ Component, pageProps }: any) {
  return (
    <RocProvider>
      <Component {...pageProps} />
    </RocProvider>
  );
}

export default MyApp;
