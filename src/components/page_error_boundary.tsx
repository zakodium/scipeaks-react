import type { ReactNode } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorPage from './error_page';

function renderFallback(props: FallbackProps) {
  return (
    <ErrorPage title="An error occurred" subtitle={props.error?.toString?.()} />
  );
}

export default function PageErrorBoundary(props: { children: ReactNode }) {
  return (
    <ErrorBoundary fallbackRender={renderFallback}>
      {props.children}
    </ErrorBoundary>
  );
}
