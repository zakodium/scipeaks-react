import Head from 'next/head';
import React from 'react';
import { IframeBridgeProvider } from 'react-iframe-bridge';

import NMRium from '../../components/nmr/nmrium';

export default function NMRiumPage() {
  return (
    <>
      <Head>
        <title>NMRium</title>
      </Head>
      <IframeBridgeProvider requireSample>
        <NMRium />
      </IframeBridgeProvider>
    </>
  );
}
