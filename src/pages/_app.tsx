import React from 'react';

import '../../styles/index.css';
import { MainSampleProvider } from '../contexts/mainSample';
import { RocProvider } from '../contexts/roc';

// nmr-displayer style dependencies
/* eslint-disable import/no-extraneous-dependencies */
import 'cheminfo-font/dist/style.css';
import 'react-animated-slider-2/build/horizontal.css';
import 'prismjs/themes/prism.css';
/* eslint-enable */

// TODO: remove this once fixed in nmr-displayer
if (typeof document !== 'undefined') {
  // @ts-ignore
  document.nmrDisplayerRootNode = document.body;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    <RocProvider>
      <MainSampleProvider uuid="6a6bb043cc1fb7ab0f7a9db4d0995728">
        <Component {...pageProps} />
      </MainSampleProvider>
    </RocProvider>
  );
}

export default MyApp;
