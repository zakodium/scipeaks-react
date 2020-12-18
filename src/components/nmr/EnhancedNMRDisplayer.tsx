import type { NMRDisplayerProps } from 'nmr-displayer';
import React, { lazy, Suspense } from 'react';

import LoadingFull from '../LoadingFull';

const NMRDisplayer = lazy(() => import('nmr-displayer'));

export default function EnhancedNMRDisplayer(props: NMRDisplayerProps) {
  return (
    <Suspense fallback={<LoadingFull />}>
      <NMRDisplayer {...props} />
    </Suspense>
  );
}
