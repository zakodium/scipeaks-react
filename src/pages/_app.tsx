import { AppProps } from 'next/app';
import React from 'react';

import { MainSampleProvider } from '../contexts/mainSample';
import { RocProvider } from '../contexts/roc';

import '../../styles/index.css';

function C6H6App({ Component, pageProps }: AppProps) {
  return (
    <RocProvider>
      <MainSampleProvider uuid="6a6bb043cc1fb7ab0f7a9db4d0995728">
        <Component {...pageProps} />
      </MainSampleProvider>
    </RocProvider>
  );
}

export default C6H6App;
