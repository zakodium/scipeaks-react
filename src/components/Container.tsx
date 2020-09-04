import React, { ReactNode } from 'react';

export default function Container(props: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{props.children}</div>
  );
}
