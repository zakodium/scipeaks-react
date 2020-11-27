import Head from 'next/head';
import NMRDisplayer from 'nmr-displayer';
import React from 'react';

import Container from '../../components/Container';
import { useRoc } from '../../contexts/roc';

export default function NmrDisplayer() {
  const { sample } = useRoc();
  if (!sample) return null;
  const nmr = sample.getValue().$content.spectra.nmr;

  const spectra = nmr
    .map((value) =>
      sample
        .getAttachment(value.jcamp.filename)
        .url.replace(`${sample.getValue()._id}/`, ''),
    )
    .map((attUrl) => ({
      display: {},
      source: { jcampURL: attUrl },
    }));

  return (
    <Container>
      <Head>
        <title>NMR Displayer</title>
      </Head>

      <main style={{ height: '100vh' }}>
        <NMRDisplayer data={{ spectra }} preferences={{}} />
      </main>
    </Container>
  );
}
