import Head from 'next/head';
import React from 'react';

import MyNewPage from '@/components/dev/MyNewPage';
import { IframeBridgeProvider } from '@/contexts/iframeBridge';

export default function NmrDisplayer() {
  return (
    <>
      <Head>
        <title>My new page</title>
      </Head>
      <IframeBridgeProvider>
        <MyNewPage />
      </IframeBridgeProvider>
    </>
  );
}
