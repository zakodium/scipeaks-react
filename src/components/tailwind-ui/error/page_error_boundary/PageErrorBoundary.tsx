import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useTranslation } from '../../internationalization/useTranslation';
import { ErrorPage } from '../ErrorPage';
import { ErrorReport } from '../ErrorReport';

function ErrorReported(props: { error: Error }) {
  const title = useTranslation('page_error_boundary.title');
  const subtitle = useTranslation('page_error_boundary.subtitle');

  return (
    <ErrorPage title={title} subtitle={subtitle}>
      <div className="mr-8">
        <ErrorReport error={props.error} />
      </div>
    </ErrorPage>
  );
}

interface PageErrorBoundaryProps {
  children: ReactNode;
}

export function PageErrorBoundary(props: PageErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorReported}>
      {props.children}
    </ErrorBoundary>
  );
}
