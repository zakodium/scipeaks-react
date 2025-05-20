import clsx from 'clsx';
import type { CSSProperties, MouseEvent, ReactElement, Ref } from 'react';
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
} from '../../../utils/defaultSearchSelectUtils';
import { useSearchSelectInternals } from '../../../utils/hooks/useSearchSelectInternals';
import type { IsOptionRemovableCallback } from '../../../utils/search_select_utils';
import { InternalMultiSearchSelect } from '../../../utils/search_select_utils';
import type {
  SearchSelectProps,
  SimpleSearchSelectProps,
} from '../search_select/SearchSelect';
import type { SimpleSelectOption } from '../select/Select';

interface VariantBadgeProps {
  variant: 'COLORED_BACKGROUND';
  color: Color;
  dot?: boolean;
}

interface ColoredBadgeProps {
  variant: 'COLORED_DOT';
  customColor: CSSProperties['color'];
  dot?: true;
}

interface CustomColoredBadgeProps {
  variant: 'CUSTOM_COLOR';
  backgroundColor: CSSProperties['color'];
  textColor: CSSProperties['color'];
  dot?: boolean;
  rounded?: boolean;
}

type GetBadgeColorReturn<T> = (
  option: T,
) => Color | CustomColoredBadgeProps | ColoredBadgeProps | VariantBadgeProps;

export interface SimpleMultiSearchSelectProps<OptionType>
  extends Omit<SimpleSearchSelectProps<OptionType>, 'selected' | 'onChange'> {
  selected: OptionType[];
  onChange: (newSelected: OptionType[]) => void;
  getBadgeColor?: GetBadgeColorReturn<OptionType>;
  isOptionRemovable?: IsOptionRemovableCallback<OptionType>;
}

export interface MultiSearchSelectProps<OptionType>
  extends Omit<SearchSelectProps<OptionType>, 'selected' | 'onChange'> {
  name: string;
  selected: OptionType[];
  onChange: (newSelected: OptionType[]) => void;
  getBadgeColor?: GetBadgeColorReturn<OptionType>;
  isOptionRemovable?: IsOptionRemovableCallback<OptionType>;
}

/**
 * Specs of the component: https://github.com/zakodium/components/wiki/Component-specifications#search-select-components
 */
export const MultiSearchSelect = forwardRefWithGeneric(
  MultiSearchSelectForwardRef,
);

function MultiSearchSelectForwardRef<OptionType>(
  props: OptionType extends SimpleSelectOption
    ? SimpleMultiSearchSelectProps<OptionType>
    : MultiSearchSelectProps<OptionType>,
  ref: Ref<HTMLInputElement>,
): ReactElement {
  const {
    onSearchChange,
    options,
    onChange,
    getBadgeColor = defaultGetBadgeColor,
    isOptionRemovable = defaultIsOptionRemovable,
    selected,
    getValue = defaultGetValue,
    renderOption = defaultRenderOption,
    renderSelectedOption,
    closeListOnSelect = false,
    clearSearchOnSelect = true,
    onCreate,
    canCreate = defaultCanCreate,
    renderCreate = defaultRenderCreate,
    clearable = true,
    disabled = false,
    optionItemSize,
    virtualizeOptionList,
    ...otherProps
  } = props;

  const finalRenderSelectedOption = renderSelectedOption || renderOption;

  const nonRemovableValues = useMemo(
    () => selected.filter((value) => !isOptionRemovable(value)),
    [selected, isOptionRemovable],
  );

  const renderedSelected = useMemo(() => {
    return selected.map((option) => {
      const value = getValue(option);
      const rendered = finalRenderSelectedOption(option);

      function handleDismiss(event: MouseEvent) {
        event.preventDefault();
        onChange(selected.filter((option) => getValue(option) !== value));
      }

      const onDismiss =
        disabled || !isOptionRemovable(option) ? undefined : handleDismiss;
      const badgeProps = getBadgeColor(option);

      const label = (
        <span
          className={clsx(
            'truncate',
            onDismiss ? 'max-w-[calc(100%-1rem)]' : 'max-w-full',
          )}
        >
          {rendered}
        </span>
      );

      // This is a tailwind badge color
      if (typeof badgeProps === 'string') {
        return (
          <Badge
            variant="COLORED_BACKGROUND"
            color={badgeProps}
            label={label}
            key={value}
            roundness="rounded"
            onDismiss={onDismiss}
            className="max-w-full"
          />
        );
      }

      return (
        <Badge
          key={value}
          label={label}
          {...badgeProps}
          onDismiss={onDismiss}
          roundness="rounded"
          className="max-w-full"
        />
      );
    });
  }, [
    selected,
    getValue,
    finalRenderSelectedOption,
    onChange,
    getBadgeColor,
    disabled,
    isOptionRemovable,
  ]);

  const onSelect = useCallback(
    (value: OptionType | undefined) => {
      if (value === undefined) {
        onChange(nonRemovableValues);
      } else {
        onChange([...selected, value]);
      }
    },
    [selected, onChange, nonRemovableValues],
  );

  const handleBackspace = useCallback(() => {
    if (
      selected.length > 0 &&
      isOptionRemovable(selected.at(-1) as OptionType)
    ) {
      onChange(selected.slice(0, -1));
    }
  }, [isOptionRemovable, onChange, selected]);

  const internalProps = useSearchSelectInternals({
    defaultFocusItem: 'first',
    showSelected: false,
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
    isOptionRemovable,
    onBackspace: handleBackspace,
    selected,
    pinSelectedOptions: false,
    virtualizeOptionList,
    optionItemSize,
    loadMore: otherProps.loadMore,
    hasMore: otherProps.hasMore,
    optionsCount: otherProps.optionsCount,
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
      virtualizeOptionList={virtualizeOptionList}
    />
  );
}
