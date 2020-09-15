import { useEffect, useReducer } from 'react';

import { useRoc } from '../contexts/roc';

interface RocQueryState {
  loading: boolean;
  error: null | Error;
  result: null | any[];
}

type RocQueryHookResult = RocQueryState;

const initialState: RocQueryState = {
  loading: true,
  error: null,
  result: null,
};

type RocQueryAction =
  | { type: 'SET_RESULT'; value: any[] }
  | { type: 'ERROR'; value: Error }
  | { type: 'LOAD' };

function rocQueryReducer(
  state: RocQueryState,
  action: RocQueryAction,
): RocQueryState {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        error: null,
        loading: true,
      };
    case 'SET_RESULT':
      return {
        loading: false,
        error: null,
        result: action.value,
      };
    case 'ERROR':
      return { loading: false, error: action.value, result: null };
    default:
      throw new Error('unreachable');
  }
}

interface RocQueryHookOptions {
  mine?: boolean;
}

export function useRocQuery(
  viewName: string,
  options: RocQueryHookOptions = {},
): RocQueryHookResult {
  const { mine = false } = options;
  const roc = useRoc();
  const [state, dispatch] = useReducer(rocQueryReducer, initialState);
  useEffect(() => {
    dispatch({ type: 'LOAD' });
    const query = roc.getQuery(viewName, { mine });
    query
      .fetch()
      .then((result) => dispatch({ type: 'SET_RESULT', value: result }))
      .catch((err) => {
        dispatch({ type: 'ERROR', value: err });
      });
  }, [roc, viewName, mine]);

  return state;
}
