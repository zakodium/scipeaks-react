import { produce } from 'immer';
import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';

import { RocProvider } from '../../../contexts/roc';
import { ActionType } from '../../tailwind-ui';

interface HomeContextType {
  rocUrl: string;
  database: string;
  iframePage: string;
  selectedSample: string | null;
}

const initialHomeContext: HomeContextType = {
  rocUrl: 'http://localhost:3000/api/fake-roc',
  database: 'eln',
  iframePage: '/nmr/nmr-displayer',
  selectedSample: null,
};

type HomeContextAction = ActionType<'SELECT_SAMPLE', string>;

const homeReducer: Reducer<HomeContextType, HomeContextAction> = produce(
  (state: HomeContextType, action: HomeContextAction) => {
    switch (action.type) {
      case 'SELECT_SAMPLE':
        state.selectedSample = action.payload;
        break;
      default:
        throw new Error('unreachable');
    }
  },
);

const homeContext = createContext(initialHomeContext);
const homeDispatchContext = createContext<Dispatch<HomeContextAction>>(() => {
  // noop
});

export function HomeContextProvider(props: { children: ReactNode }) {
  const [homeState, dispatch] = useReducer(homeReducer, initialHomeContext);

  return (
    <homeContext.Provider value={homeState}>
      <homeDispatchContext.Provider value={dispatch}>
        <RocProvider
          database={initialHomeContext.database}
          url={initialHomeContext.rocUrl}
        >
          {props.children}
        </RocProvider>
      </homeDispatchContext.Provider>
    </homeContext.Provider>
  );
}

export function useHomeContext() {
  return useContext(homeContext);
}

export function useHomeDispatchContext() {
  return useContext(homeDispatchContext);
}
