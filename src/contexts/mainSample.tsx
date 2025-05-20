/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import React, { createContext, useContext } from 'react';
import type { RocDocument } from 'rest-on-couch-client';

import { ErrorPage } from '@/components/tailwind-ui';
import { ErrorReport } from '@/components/tailwind-ui/error/ErrorReport';
import { useRocDocument } from '@/hooks/useRocDocument';

const mainSampleContext = createContext<RocDocument | null>(null);

export function useMainSample() {
  const sample = useContext(mainSampleContext);
  if (!sample) {
    throw new Error('missing main sample');
  }
  return sample;
}

export function MainSampleProvider(props: {
  uuid: string;
  children: ReactNode;
}) {
  const sample = useRocDocument(props.uuid);

  if (sample.error) {
    return (
      <ErrorPage
        title="Error loading the main sample"
        subtitle={sample.error.message}
      >
        <ErrorReport error={sample.error} />
      </ErrorPage>
    );
  }

  if (!sample.document) {
    return <div>TODO: show loading component</div>;
  }

  return (
    <mainSampleContext.Provider value={sample.document}>
      {props.children}
    </mainSampleContext.Provider>
  );
}
