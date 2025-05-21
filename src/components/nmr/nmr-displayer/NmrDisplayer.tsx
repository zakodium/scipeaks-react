import { Molecule } from 'openchemlib';
import React from 'react';
import { useIframeBridgeSample } from 'react-iframe-bridge';

import ErrorPage from '@/components/error_page';

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

  if (!content.spectra?.nmr || content.spectra.nmr.length === 0) {
    return <NoNmr />;
  }

  const spectraUrls = content.spectra.nmr
    .filter((value) => Boolean(value.jcamp?.filename))
    .map((value) => sample.getAttachment(value.jcamp.filename).url);

  if (spectraUrls.length === 0) {
    return <NoNmr />;
  }

  const sourceEntries = [];
  const spectra = [];

  for (const spectrumUrl of spectraUrls) {
    const name = sampleValue.$id.join(' ');
    const urlObj = new URL(spectrumUrl);
    const baseURL = urlObj.origin;
    const relativePath = urlObj.href.replace(urlObj.origin, '');

    sourceEntries.push({
      baseURL,
      relativePath,
    });
    spectra.push({
      info: { name },
      sourceSelector: { files: [relativePath] },
    });
  }

  const molecules = [];
  if (content.general) {
    const moleculeName =
      // @ts-expect-error Types are missing from react-iframe-bridge
      content.general.title || content.general.name?.[0]?.value;
    if (content.general.molfile) {
      molecules.push({ molfile: content.general.molfile, label: moleculeName });
    } else if (content.general.ocl) {
      const molecule = Molecule.fromIDCode(
        content.general.ocl.value,
        content.general.ocl.coordinates,
      );
      molecules.push({ molfile: molecule.toMolfileV3(), label: moleculeName });
    }
  }

  const state: any = {
    version: 9,
    data: {
      source: { entries: sourceEntries },
      spectra,
      molecules,
    },
  };

  return <EnhancedNMRium data={state} />;
}
