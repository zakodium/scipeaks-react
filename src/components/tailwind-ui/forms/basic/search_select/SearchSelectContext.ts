import type { useInteractions } from '@floating-ui/react';
import type { RefObject } from 'react';
import { createContext, useContext } from 'react';

import type { UseSearchSelectVirtualizerReturn } from './useSearchSelectVirtualizer';

type NumberOrNull = number | null;

export interface SearchSelectContext<OptionType = unknown> {
  activeIndex: NumberOrNull;
  selectedIndex: NumberOrNull;
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
  handleSelect: (index: number) => void;
  virtualizer: UseSearchSelectVirtualizerReturn<OptionType>;
  setPointer: (pointer: boolean) => void;
  virtualizeOptionList: boolean;

  wrapperRef: RefObject<HTMLDivElement> | null;
}

export const searchSelectContext = createContext<SearchSelectContext | null>(
  null,
);

export function useSearchSelectContext() {
  const context = useContext(searchSelectContext);

  if (!context) {
    throw new Error('FloatingSearchSelectContext should be defined');
  }

  return context;
}
