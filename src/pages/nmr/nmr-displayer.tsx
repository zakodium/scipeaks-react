import Head from 'next/head';
import React from 'react';

import Container from '../../components/Container';
import EnhancedNMRDisplayer from '../../components/nmr/EnhancedNMRDisplayer';
import { useMainSample } from '../../contexts/mainSample';

function noop() {
  // empty
}

export default function NmrDisplayer() {
  const sample = useMainSample();
  const nmr = sample.getValue().$content.spectra.nmr;

  const spectra = nmr
    // @ts-ignore
    .map((value) =>
      sample
        .getAttachment(value.jcamp.filename)
        .url.replace(`${sample.getValue()._id}/`, ''),
    )
    // @ts-ignore
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
        <EnhancedNMRDisplayer
          docsBaseUrl=""
          onDataChange={noop}
          data={{ spectra }}
          preferences={{}}
        />
      </main>
    </Container>
  );
}
