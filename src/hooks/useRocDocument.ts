import { useEffect, useReducer } from 'react';
import { useRoc } from 'react-iframe-bridge';
import { RocDocument } from 'rest-on-couch-client';

interface RocDocumentState {
  loading: boolean;
  error: null | Error;
  document: null | RocDocument;
}

type RocDocumentHookResult = RocDocumentState;

const initialState: RocDocumentState = {
  loading: true,
  error: null,
  document: null,
};

type RocDocumentAction =
  | { type: 'SET_DOCUMENT'; value: RocDocument }
  | { type: 'ERROR'; value: Error }
  | { type: 'LOAD' };

function rocDocumentReducer(
  state: RocDocumentState,
  action: RocDocumentAction,
): RocDocumentState {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        error: null,
        loading: true,
      };
    case 'SET_DOCUMENT':
      return {
        loading: false,
        error: null,
        document: action.value,
      };
    case 'ERROR':
      return { loading: false, error: action.value, document: null };
    default:
      throw new Error('unreachable');
  }
}

export function useRocDocument(uuid: string): RocDocumentHookResult {
  const roc = useRoc();
  const [state, dispatch] = useReducer(rocDocumentReducer, initialState);
  useEffect(() => {
    const doc = roc.getDocument<Record<string, unknown>, string>(uuid);
    doc
      .fetch()
      .then(() => dispatch({ type: 'SET_DOCUMENT', value: doc }))
      .catch((err) => {
        dispatch({ type: 'ERROR', value: err });
      });
  }, [roc, uuid]);

  return state;
}
