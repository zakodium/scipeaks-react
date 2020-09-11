import React from 'react';

import { useSample } from '../hooks/useSample';

export default function Index() {
  const sample = useSample('6a6bb043cc1fb7ab0f7a9db4d0995728');
  if (sample.loading) {
    return <div>Loading...</div>;
  }

  return <div>{sample.sample.getValue().$id}</div>;
}
