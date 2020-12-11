import type { NMRDisplayerProps } from 'nmr-displayer';
import React, { lazy, Suspense } from 'react';

import LoadingFull from '../LoadingFull';

/* eslint-disable import/no-extraneous-dependencies */
import 'cheminfo-font/dist/style.css';
import 'prismjs/themes/prism.css';
/* eslint-enable */

const NMRDisplayer = lazy(() => import('nmr-displayer'));

export default function EnhancedNMRDisplayer(props: NMRDisplayerProps) {
  return (
    <Suspense fallback={<LoadingFull />}>
      <NMRDisplayer {...props} />
    </Suspense>
  );
}
