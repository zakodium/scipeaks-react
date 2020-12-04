import { AppProps } from 'next/app';
import React from 'react';

import '../../styles/index.css';

function C6H6App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default C6H6App;
