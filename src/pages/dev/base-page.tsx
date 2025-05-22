import Head from 'next/head';
import { IframeBridgeProvider } from 'react-iframe-bridge';

import MyNewPage from '@/components/dev/MyNewPage';

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
