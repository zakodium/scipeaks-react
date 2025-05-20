import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { MutableRefObject } from 'react';
import { useCallback } from 'react';

import type { InternalOption } from '../../../utils/search_select_utils';

interface UseSearchSelectVirtualizerOptions {
  estimateSize?: (index: number) => number;
  virtualizeOptionList: boolean;
}

interface GetSearchSelectItem<OptionType> {
  option: InternalOption<OptionType>;
  virtualItem: VirtualItem | null;
}

export interface UseSearchSelectVirtualizerReturn<OptionType> {
  getSearchSelectItems: () => Array<GetSearchSelectItem<OptionType>>;
  virtualizer: Virtualizer<HTMLElement, Element>;
}

export function useSearchSelectVirtualizer<OptionType>(
  options: Array<InternalOption<OptionType>>,
  floatingRefs: MutableRefObject<HTMLElement | null>,
  opts: UseSearchSelectVirtualizerOptions,
): UseSearchSelectVirtualizerReturn<OptionType> {
  const { estimateSize = () => 36, virtualizeOptionList } = opts;

  const virtualizer = useVirtualizer({
    enabled: virtualizeOptionList,
    count: options.length,
    getScrollElement: () => floatingRefs.current,
    estimateSize,
  });

  const getSearchSelectItems = useCallback(() => {
    if (!virtualizer.options.enabled) {
      return options.map((option) => ({ option, virtualItem: null }));
    }

    return virtualizer.getVirtualItems().map((virtualItem) => {
      return { option: options[virtualItem.index], virtualItem };
    });
  }, [options, virtualizer]);

  return {
    virtualizer,
    getSearchSelectItems,
  };
}
