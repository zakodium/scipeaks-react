import Head from 'next/head';
import React from 'react';

import MyNewPage from '@/components/dev/MyNewPage';
import { IframeBridgeProvider } from '@/react-iframe-bridge';

export default function BasePage() {
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
