import type { ByteSizeOptions } from 'byte-size';
import type { ReactNode } from 'react';

import { byteSizeOptionsContext } from './byteSizeFormatContext';

export function ByteSizeOptionsProvider(props: {
  value: ByteSizeOptions;
  children: ReactNode;
}) {
  return (
    <byteSizeOptionsContext.Provider value={props.value}>
      {props.children}
    </byteSizeOptionsContext.Provider>
  );
}
