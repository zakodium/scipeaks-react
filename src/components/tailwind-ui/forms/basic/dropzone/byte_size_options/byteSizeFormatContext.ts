import type { ByteSizeOptions } from 'byte-size';
import { createContext, useContext } from 'react';

export const byteSizeOptionsContext = createContext<
  ByteSizeOptions | undefined
>(undefined);

export function useByteSizeOptions(): ByteSizeOptions | undefined {
  return useContext(byteSizeOptionsContext);
}
