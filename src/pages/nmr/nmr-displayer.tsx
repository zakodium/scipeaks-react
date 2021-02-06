import Head from 'next/head';
import React from 'react';

import NmrDisplayerPage from '@/components/nmr/nmr-displayer/NmrDisplayerPage';
import { IframeBridgeProvider } from '@/contexts/iframeBridge';

export default function NmrDisplayer() {
  return (
    <>
      <Head>
        <title>NMR Displayer</title>
      </Head>
      <IframeBridgeProvider requireSample>
        <NmrDisplayerPage />
      </IframeBridgeProvider>
    </>
  );
}
