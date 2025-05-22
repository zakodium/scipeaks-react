import Head from 'next/head';
import React from 'react';
import { IframeBridgeProvider } from 'react-iframe-bridge';

import NmrDisplayer from '@/components/nmr/nmr-displayer/NmrDisplayer';

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
