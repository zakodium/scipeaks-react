import { Molecule } from 'openchemlib/full';
import React from 'react';

import { ErrorPage } from '@/components/tailwind-ui';
import { useIframeBridgeSample } from '@/contexts/iframeBridge';

import EnhancedNMRDisplayer from '../EnhancedNMRDisplayer';

function NoNmr() {
  return (
    <ErrorPage
      title="Missing NMR data"
      subtitle="This sample has no NMR spectra."
      hideImage
    />
  );
}

export default function NmrDisplayerPage() {
  const sample = useIframeBridgeSample();
  const sampleValue = sample.getValue();
  const content = sampleValue.$content;

  if (
    !content.spectra ||
    !content.spectra.nmr ||
    content.spectra.nmr.length === 0
  ) {
    return <NoNmr />;
  }

  const spectra = content.spectra.nmr
    .filter((value) => Boolean(value.jcamp?.filename))
    .map((value) => sample.getAttachment(value.jcamp.filename).url)
    .map((attUrl) => ({
      display: {
        name: sampleValue.$id.join(' '),
      },
      source: { jcampURL: attUrl },
    }));

  if (spectra.length === 0) {
    return <NoNmr />;
  }

  const molecules = [];
  if (content.general) {
    if (content.general.molfile) {
      molecules.push({ molfile: content.general.molfile });
    } else if (content.general.ocl) {
      const molecule = Molecule.fromIDCode(
        content.general.ocl.value,
        content.general.ocl.coordinates,
      );
      molecules.push({ molfile: molecule.toMolfileV3() });
    }
  }

  return (
    <EnhancedNMRDisplayer
      data={{ spectra, molecules }}
      preferences={{
        general: {},
        panels: {
          hideSummaryPanel: true,
          hideMultipleSpectraAnalysisPanel: true,
        },
        toolBarButtons: {
          hideImport: true,
          hideExportAs: true,
        },
      }}
    />
  );
}
