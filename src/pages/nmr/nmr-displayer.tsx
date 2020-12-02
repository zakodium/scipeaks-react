import Head from 'next/head';
// eslint-disable-next-line import/no-unresolved
import NMRDisplayer from 'nmr-displayer';
import React from 'react';

import Container from '../../components/Container';
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
        <NMRDisplayer
          docsBaseUrl=""
          onDataChange={noop}
          data={{ spectra }}
          preferences={{}}
        />
      </main>
    </Container>
  );
}
