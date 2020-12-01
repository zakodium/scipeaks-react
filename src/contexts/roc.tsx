import React, { createContext, ReactNode, useContext } from 'react';
import { Roc } from 'rest-on-couch-client';

const rocContext = createContext<Roc | null>(null);

export function useRoc() {
  const roc = useContext(rocContext);
  if (!roc) {
    throw new Error('missing roc');
  }
  return roc;
}

const roc = new Roc({
  url: 'https://test.cheminfo.org/roc',
  database: 'eln',
});

export function RocProvider(props: { children: ReactNode }) {
  return (
    <rocContext.Provider value={roc}>{props.children}</rocContext.Provider>
  );
}
