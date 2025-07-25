/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { RocDocument } from 'rest-on-couch-client';

import ErrorPage from '@/components/error_page.js';
import { useRocDocument } from '@/hooks/useRocDocument.js';

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
    reportError(sample.error);
    return (
      <ErrorPage
        title="Error loading the main sample"
        subtitle={sample.error.message}
      />
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
