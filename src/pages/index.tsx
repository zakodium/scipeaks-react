import Head from 'next/head';
import React from 'react';

import Container from '../components/Container';
import Test from '../components/Test';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <Test />
      </main>
    </Container>
  );
}
