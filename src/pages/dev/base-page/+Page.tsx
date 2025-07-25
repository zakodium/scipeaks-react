import { IframeBridgeProvider } from 'react-iframe-bridge';

import MyNewPage from '@/components/dev/MyNewPage.js';

export default function BasePage() {
  return (
    <IframeBridgeProvider>
      <MyNewPage />
    </IframeBridgeProvider>
  );
}
