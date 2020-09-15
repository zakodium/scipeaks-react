import React from 'react';

import { MainSampleProvider, useMainSample } from '../contexts/mainSample';

export default function Index() {
  return (
    <MainSampleProvider uuid="6a6bb043cc1fb7ab0f7a9db4d0995728">
      <Sample />
    </MainSampleProvider>
  );
}

function Sample() {
  const sample = useMainSample();
  return <div>{sample.getValue().$id}</div>;
}
