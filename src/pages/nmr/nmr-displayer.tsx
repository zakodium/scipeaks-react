import Head from 'next/head';
import React from 'react';

import NmrDisplayer from '@/components/nmr/nmr-displayer/NmrDisplayer';
import { IframeBridgeProvider } from '@/contexts/iframeBridge';

export default function NmrDisplayerPage() {
  return (
    <>
      <Head>
        <title>NMR Displayer</title>
      </Head>
      <IframeBridgeProvider requireSample>
        <NmrDisplayer />
      </IframeBridgeProvider>
    </>
  );
}
