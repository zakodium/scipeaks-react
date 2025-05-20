import { useMemo, useState } from 'react';

import type { SimpleSelectOption } from '../forms/basic/select/Select';
import { defaultOptionsFilter } from '../utils/defaultSearchSelectUtils';
import type { OptionsFilter } from '../utils/search_select_utils';

export type { OptionsFilter } from '../utils/search_select_utils';

export interface SearchSelectHookResult<OptionType> {
  searchValue: string;
  onSearchChange: (newValue: string) => void;
  options: OptionType[];
  selected: OptionType | undefined;
  onChange: (option: OptionType | undefined) => void;
  optionsCount: number;
}

export interface SearchSelectFieldHookResult<OptionType>
  extends SearchSelectHookResult<OptionType> {
  name: string;
}

export interface SimpleSearchSelectHookConfig<OptionType> {
  options: OptionType[];
  filterOptions?: OptionsFilter<OptionType>;
  initialSelected?: OptionType;
}

export interface SearchSelectHookConfig<OptionType>
  extends SimpleSearchSelectHookConfig<OptionType> {
  filterOptions: OptionsFilter<OptionType>;
}

export function useSearchSelect<OptionType>(
  config: OptionType extends SimpleSelectOption
    ? SimpleSearchSelectHookConfig<OptionType>
    : SearchSelectHookConfig<OptionType>,
): SearchSelectHookResult<OptionType> {
  const {
    options,
    filterOptions = defaultOptionsFilter,
    initialSelected,
  } = config;

  const [searchValue, setSearchValue] = useState('');

  const newOptions = useMemo(
    () => filterOptions(searchValue, options),
    [options, filterOptions, searchValue],
  );

  const [selected, onChange] = useState<OptionType | undefined>(
    initialSelected,
  );

  return {
    searchValue,
    onSearchChange: setSearchValue,
    options: newOptions,
    selected,
    onChange,
    optionsCount: options.length,
  };
}
