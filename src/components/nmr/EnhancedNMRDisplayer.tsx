import dynamic from 'next/dynamic';
import type { NMRDisplayerProps } from 'nmr-displayer';
import React from 'react';

import LoadingFull from '../LoadingFull';

const NMRDisplayer = dynamic(() => import('nmr-displayer'), {
  loading: () => <LoadingFull />,
});

export default function EnhancedNMRDisplayer(props: NMRDisplayerProps) {
  return <NMRDisplayer {...props} />;
}
