/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRoc } from 'react-iframe-bridge';
import type { ICouchUser } from 'rest-on-couch-client';

interface RocUserState {
  auth: ICouchUser;
}

const rocUserContext = createContext<RocUserState | null>(null);

export function useRocUser() {
  const rocUser = useContext(rocUserContext);
  if (!rocUser) {
    throw new Error('missing roc user');
  }
  return rocUser;
}

export function RocUserProvider(props: { children: ReactNode }) {
  const roc = useRoc();
  const [user, setUser] = useState<Partial<RocUserState>>({});
  useEffect(() => {
    roc
      .getUser()
      .then((authUser) => {
        setUser((previousUser) => ({ ...previousUser, auth: authUser }));
      })
      .catch(() => {
        // TODO: handle error
      });
  }, [roc]);

  const { auth } = user;

  if (!auth) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <rocUserContext.Provider value={{ auth }}>
      {props.children}
    </rocUserContext.Provider>
  );
}
