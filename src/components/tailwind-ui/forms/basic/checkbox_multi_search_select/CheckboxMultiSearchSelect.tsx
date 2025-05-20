import type { ReactElement, ReactNode, Ref } from 'react';
import { useCallback, useMemo } from 'react';

import { Badge } from '../../../elements/badge/Badge';
import type { Color } from '../../../types';
import { forwardRefWithGeneric } from '../../../util';
import {
  defaultCanCreate,
  defaultGetBadgeColor,
  defaultGetValue,
  defaultIsOptionRemovable,
  defaultRenderCreate,
  defaultRenderOption,
  defaultRenderSelectedOptions,
} from '../../../utils/defaultSearchSelectUtils';
import { useSearchSelectInternals } from '../../../utils/hooks/useSearchSelectInternals';
import { InternalMultiSearchSelect } from '../../../utils/search_select_utils';
import type {
  MultiSearchSelectProps,
  SimpleMultiSearchSelectProps,
} from '../multi_search_select/MultiSearchSelect';
import type { SimpleSelectOption } from '../select/Select';

/**
 * Specs of the component: https://github.com/zakodium/components/wiki/Component-specifications#search-select-components
 */
export const CheckboxMultiSearchSelect = forwardRefWithGeneric(
  CheckboxMultiSearchSelectForwardRef,
);

interface CheckboxMultiSearchSelectExclusiveProps<OptionType> {
  renderSelectedOptions?: (options: OptionType[]) => ReactNode;
  getBadgeColor?: (option: OptionType[]) => Color;
  selectedFiltered?: OptionType[];
  pinSelectedOptions?: boolean;
}

export type CheckboxMultiSearchSelectProps<OptionType> = Omit<
  MultiSearchSelectProps<OptionType>,
  'renderSelectedOption' | 'getBadgeColor'
> &
  CheckboxMultiSearchSelectExclusiveProps<OptionType>;

export type CheckboxSimpleMultiSearchSelectProps<OptionType> = Omit<
  SimpleMultiSearchSelectProps<OptionType>,
  'renderSelectedOption' | 'getBadgeColor'
> &
  CheckboxMultiSearchSelectExclusiveProps<OptionType>;

function CheckboxMultiSearchSelectForwardRef<OptionType>(
  props: OptionType extends SimpleSelectOption
    ? CheckboxSimpleMultiSearchSelectProps<OptionType>
    : CheckboxMultiSearchSelectProps<OptionType>,
  ref: Ref<HTMLInputElement>,
): ReactElement {
  const {
    onSearchChange,
    options,
    onChange,
    isOptionRemovable = defaultIsOptionRemovable,
    selected,
    selectedFiltered: filteredSelected,
    getValue = defaultGetValue,
    renderOption = defaultRenderOption,
    renderSelectedOptions = defaultRenderSelectedOptions,
    getBadgeColor = defaultGetBadgeColor,
    closeListOnSelect = false,
    clearSearchOnSelect = true,
    onCreate,
    canCreate = defaultCanCreate,
    renderCreate = defaultRenderCreate,
    clearable = true,
    disabled = false,
    pinSelectedOptions = false,
    optionItemSize,
    virtualizeOptionList,
    ...otherProps
  } = props;

  const nonRemovableValues = useMemo(
    () => selected.filter((value) => !isOptionRemovable(value)),
    [selected, isOptionRemovable],
  );

  const renderedSelected = useMemo(() => {
    const rendered = renderSelectedOptions(selected);

    if (rendered) {
      return [
        <Badge
          key="selected-items"
          variant="COLORED_BACKGROUND"
          label={rendered}
          color={getBadgeColor(selected)}
          roundness="rounded"
        />,
      ];
    }
    return [];
  }, [selected, renderSelectedOptions, getBadgeColor]);

  const onSelect = useCallback(
    (value: OptionType | undefined, remove?: boolean) => {
      if (value === undefined) {
        onChange(nonRemovableValues);
      } else if (remove) {
        onChange(
          selected.filter((option) => getValue(option) !== getValue(value)),
        );
      } else {
        onChange([...selected, value]);
      }
    },
    [selected, onChange, nonRemovableValues, getValue],
  );

  const internalProps = useSearchSelectInternals({
    showSelected: true,
    defaultFocusItem: 'first',
    selected,
    filteredSelected,
    searchValue: props.searchValue,
    onSearchChange,
    options,
    onSelect,
    getValue,
    renderOption,
    closeListOnSelect,
    clearSearchOnSelect,
    onCreate,
    canCreate,
    renderCreate,
    pinSelectedOptions,
    isOptionRemovable,
    optionItemSize,
    virtualizeOptionList,
  });

  return (
    <InternalMultiSearchSelect
      {...internalProps}
      {...otherProps}
      inputRef={ref}
      clearable={clearable}
      disabled={disabled}
      hasClearableValue={selected.length !== nonRemovableValues.length}
      selectedBadges={renderedSelected}
    />
  );
}
