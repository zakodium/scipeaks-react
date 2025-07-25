import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import PageErrorBoundary from '@/components/page_error_boundary.js';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

function SciPeaksAppWrapper({ children }: { children: ReactNode }) {
  return (
    <PageErrorBoundary>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PageErrorBoundary>
  );
}

export default SciPeaksAppWrapper;
