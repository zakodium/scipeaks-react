import React from 'react';

import '../../styles/index.css';
import { RocProvider } from '../contexts/roc';

// nmr-displayer style dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cheminfo-font/dist/style.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-animated-slider-2/build/horizontal.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'prismjs/themes/prism.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    <RocProvider>
      <Component {...pageProps} />
    </RocProvider>
  );
}

export default MyApp;
