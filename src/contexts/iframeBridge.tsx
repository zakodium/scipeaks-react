import { ready, onMessage } from 'iframe-bridge/iframe';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Roc, RocDocument } from 'rest-on-couch-client';

import { Spinner } from '../components/tailwind-ui';
import { SampleEntryContent } from '../types/db';

interface IframBridgeContextType {
  roc: Roc;
  sample: RocDocument<SampleEntryContent> | null;
}

const iframeBridgeContext = createContext<IframBridgeContextType | null>(null);

export function useIframeBridgeContext(): IframBridgeContextType {
  const context = useContext(iframeBridgeContext);
  if (!context) {
    throw new Error('Iframe bridge context is not ready');
  }
  return context;
}

export function useIframeBridgeSample(): RocDocument<SampleEntryContent> {
  const context = useIframeBridgeContext();
  if (!context.sample) {
    throw new Error('No sample in context');
  }
  return context.sample;
}

interface IframeMessage {
  type: 'tab.data';
  message: {
    couchDB: {
      url: string;
      database: string;
    };
    uuid: string;
  };
}

export function IframeBridgeProvider(props: {
  children: ReactNode;
  withSample?: boolean;
}) {
  const [data, setData] = useState<IframeMessage['message']>();

  useEffect(() => {
    onMessage((message: IframeMessage) => {
      switch (message.type) {
        case 'tab.data': {
          setData(message.message);
          break;
        }
        default:
          throw new Error('unreachable');
      }
    });
    ready();
  }, []);

  const roc = useMemo(() => {
    if (data) {
      return new Roc(data.couchDB);
    }
  }, [data]);

  const [sample, setSample] = useState<RocDocument<SampleEntryContent> | null>(
    null,
  );

  useEffect(() => {
    if (!roc || !data || !data.uuid) return;
    const document = roc.getDocument<SampleEntryContent>(data.uuid);
    document
      .fetch()
      .then(() => {
        setSample(document);
      })
      .catch((error) => {
        // TODO: handle error
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [roc, data]);

  if (!roc || (!sample && props.withSample)) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner className="w-10 h-10 text-alternative-500" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <iframeBridgeContext.Provider value={{ roc, sample }}>
        {props.children}
      </iframeBridgeContext.Provider>
    </div>
  );
}
