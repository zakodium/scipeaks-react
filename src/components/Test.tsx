import React from 'react';

import { useRoc } from '../contexts/roc';

import { Input } from './tailwind-ui';

export default function Test() {
  const roc = useRoc();
  console.log(roc);
  return <Input id="myInput" label="Hello baby" error="My error" />;
}
