import { IframeBridgeProvider } from 'react-iframe-bridge';

import NMRium from '@/components/nmr/nmrium/index.js';

export default function NMRiumPage() {
  return (
    <IframeBridgeProvider requireSample>
      <NMRium />
    </IframeBridgeProvider>
  );
}
