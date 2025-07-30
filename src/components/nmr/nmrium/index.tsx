import type { NmriumState } from '@zakodium/nmrium-core';
import * as IframeBridge from 'iframe-bridge/iframe';
import type { NMRiumProps } from 'nmrium';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useIframeBridgeSample } from 'react-iframe-bridge';

import ErrorPage from '@/components/error_page.js';

import EnhancedNMRium from './enhanced_nmrium.js';
import type { ScipeaksPluginContextValue } from './scipeaks_plugin/scipeaks_plugin_context.js';
import { ScipeaksPluginContext } from './scipeaks_plugin/scipeaks_plugin_context.js';
import { nmriumToScipeaks } from './state/nmrium_to_scipeaks.js';
import { scipeaksToNMRium } from './state/scipeaks_to_nmrium.js';

function NoNmr() {
  return (
    <ErrorPage
      title="Missing NMR data"
      subtitle="This sample has no NMR spectra."
    />
  );
}

export default function NMRium() {
  const sample = useIframeBridgeSample();

  const initialState: any = useMemo(() => {
    const nmriumData = scipeaksToNMRium(sample);
    return {
      version: 9,
      data: nmriumData,
    };
  }, [sample]);

  const [isDirty, setDirty] = useState(false);

  const nmriumState = useRef<NmriumState | null>(null);
  const setSaved = useCallback(
    (isSaved: boolean) => {
      IframeBridge.postMessage('tab.status', {
        saved: isSaved,
      });
      setDirty(!isSaved);
    },
    [setDirty],
  );

  const saveChanges = useCallback(() => {
    if (!nmriumState.current) return;
    const newContent = nmriumToScipeaks(
      sample.getValue().$content,
      nmriumState.current,
    );
    sample.update(newContent).catch((error) => {
      // TODO: handle error.
      // Could use a notification, and suggest to reload the sample if error is due to a conflict.
      reportError(error);
    });
    setSaved(true);
  }, [sample, setSaved]);

  const scipeaksContext: ScipeaksPluginContextValue = useMemo(() => {
    return { isDirty, saveChanges };
  }, [isDirty, saveChanges]);

  if (initialState.data.spectra.length === 0) {
    return <NoNmr />;
  }

  const handleChange: NMRiumProps['onChange'] = (state, source) => {
    if (source === 'data' && state.data.actionType !== 'INITIATE') {
      nmriumState.current = state;
      setSaved(false);
    }
  };

  return (
    <ScipeaksPluginContext.Provider value={scipeaksContext}>
      <EnhancedNMRium data={initialState.data} onChange={handleChange} />
    </ScipeaksPluginContext.Provider>
  );
}
