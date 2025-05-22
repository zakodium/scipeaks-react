import { NonIdealState } from '@blueprintjs/core';
import type { ReactNode } from 'react';

interface ErrorPageProps {
  title: ReactNode;
  subtitle: ReactNode;
}

export default function ErrorPage(props: ErrorPageProps) {
  return (
    <NonIdealState
      icon="warning-sign"
      title={props.title}
      description={props.subtitle}
    />
  );
}
