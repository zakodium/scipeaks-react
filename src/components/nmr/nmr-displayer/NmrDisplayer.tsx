import { Molecule } from 'openchemlib/full';
import React from 'react';
import { useIframeBridgeSample } from 'react-iframe-bridge';

import { ErrorPage } from '@/components/tailwind-ui';

import EnhancedNMRium from '../EnhancedNMRium';

function NoNmr() {
  return (
    <ErrorPage
      title="Missing NMR data"
      subtitle="This sample has no NMR spectra."
    />
  );
}

export default function NmrDisplayer() {
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
    <EnhancedNMRium
      data={{ spectra, molecules }}
      preferences={{
        general: {},
        panels: {},
        toolBarButtons: {},
      }}
    />
  );
}
