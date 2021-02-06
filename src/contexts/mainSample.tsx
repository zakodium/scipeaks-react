import React, { createContext, ReactNode, useContext } from 'react';
import { RocDocument } from 'rest-on-couch-client';

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
        children={<ErrorReport error={sample.error} />}
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
