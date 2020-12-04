import React from 'react';

import { useIframeBridgeSample } from '../../../contexts/iframeBridge';
import EnhancedNMRDisplayer from '../EnhancedNMRDisplayer';

export default function NmrDisplayerPage() {
  const sample = useIframeBridgeSample();
  const nmr = sample.getValue().$content.spectra.nmr;
  const spectra = nmr
    .map((value) => sample.getAttachment(value.jcamp.filename).url)
    .map((attUrl) => ({
      display: {},
      source: { jcampURL: attUrl },
    }));

  return (
    <EnhancedNMRDisplayer
      docsBaseUrl=""
      onDataChange={() => {
        // noop
      }}
      data={{ spectra }}
    />
  );
}
