import React from 'react';

import { useIframeBridgeSample } from '../../../contexts/iframeBridge';
import { ErrorPage } from '../../tailwind-ui';
import EnhancedNMRDisplayer from '../EnhancedNMRDisplayer';

export default function NmrDisplayerPage() {
  const sample = useIframeBridgeSample();
  const content = sample.getValue().$content;

  if (
    !content.spectra ||
    !content.spectra.nmr ||
    content.spectra.nmr.length === 0
  ) {
    return (
      <ErrorPage
        title="Missing NMR data"
        subtitle="This sample has no NMR spectra."
        hideImage
      />
    );
  }

  const spectra = content.spectra.nmr
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
