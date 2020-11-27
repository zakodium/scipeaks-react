import React, { createContext, ReactNode, useContext } from 'react';
import { RocDocument } from 'rest-on-couch-client';

import { Alert, AlertType } from '../components/tailwind-ui';
import { useRocDocument } from '../hooks/useRocDocument';

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
    return <Alert title="TODO: display error" type={AlertType.ERROR} />;
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
