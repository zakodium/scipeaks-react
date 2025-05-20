import dynamic from 'next/dynamic';
import type { NMRiumProps } from 'nmrium';
import React from 'react';

import LoadingFull from '../LoadingFull';

const NMRium = dynamic(() => import('nmrium').then((mod) => mod.NMRium), {
  ssr: false,
  loading: () => <LoadingFull />,
});

export default function EnhancedNMRium(props: Omit<NMRiumProps, 'getSpinner'>) {
  return <NMRium getSpinner={() => <LoadingFull />} {...props} />;
}
