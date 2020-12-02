import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ICouchUser } from 'rest-on-couch-client';

import { useRoc } from './roc';

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
    <rocUserContext.Provider value={{ auth }}>
      {props.children}
    </rocUserContext.Provider>
  );
}
