import type { ReactElement, ReactNode, Ref } from 'react';
import { useMemo } from 'react';

import { forwardRefWithGeneric } from '../../../util';
import {
  defaultCanCreate,
  defaultGetValue,
  defaultRenderCreate,
  defaultRenderOption,
} from '../../../utils/defaultSearchSelectUtils';
import { useSearchSelectInternals } from '../../../utils/hooks/useSearchSelectInternals';
import { InternalSearchSelect } from '../../../utils/search_select_utils';
import type { HelpPublicProps } from '../common';
import type {
  GetValue,
  RenderOption,
  SimpleSelectOption,
} from '../select/Select';

export interface SimpleSearchSelectProps<OptionType> {
  /**
   * List of options to select from.
   */
  options: OptionType[];
  /**
   * Currently selected option.
   */
  selected?: OptionType;
  /**
   * Callback which will be called when an option is selected or when clearing is requested.
   */
  onChange: (option: OptionType | undefined) => void;
  /**
   * Callback which will be called when the user selects the "create" option.
   * Passing this prop is what makes the option to appear.
   */
  onCreate?: SearchSelectOnCreateCallback<OptionType>;
  /**
   * Callback which will be called before displaying the "create" option to the
   * user. If it is present and doesn't return `true`, the option will not be displayed.
   */
  canCreate?: SearchSelectCanCreateCallback;
  /**
   * Custom function to render the "create" option.
   */
  renderCreate?: SearchSelectRenderCreateCallback;

  /**
   * Function to get the value that uniquely identifies each option.
   */
  getValue?: GetValue<OptionType>;
  /**
   * Custom function to render each option.
   */
  renderOption?: RenderOption<OptionType>;
  /**
   * Custom function to render the selected option.
   */
  renderSelectedOption?: RenderOption<OptionType>;
  /**
   * Hint displayed when there are no search results.
   * Defaults to the string 'No results.'.
   */
  noResultsHint?: ReactNode;

  /**
   * Whether the list should be closed when an element is selected.
   */
  closeListOnSelect?: boolean;
  /**
   * Whether the search value should be cleared (by calling `onSearchChange`
   * with an empty string) when an element is selected.
   */
  clearSearchOnSelect?: boolean;

  /**
   * Value to control the input field.
   */
  searchValue: string;
  /**
   * Called when the value in the input is about to change.
   */
  onSearchChange: (newValue: string) => void;
  /**
   * Input field's label.
   */
  label: ReactNode;
  /**
   * Do not display the label, keeping it in the DOM for accessibility.
   */
  hiddenLabel?: boolean;
  /**
   * Custom react node to display in the upper right corner of the input
   */
  corner?: ReactNode;
  /**
   * Placeholder to display when no value is selected and no search text is entered.
   */
  placeholder?: string;
  /**
   * Adds a red * to the label.
   */
  required?: boolean;
  /**
   * Called when the input field is blurred.
   */
  onBlur?: (e: React.FocusEvent) => void;
  /**
   * Input field's id.
   */
  id?: string;
  /**
   * Input field's name.
   */
  name?: string;
  /**
   * Allows to unselect the currently selected value.
   */
  clearable?: boolean;
  /**
   * Disable interactions with the field.
   */
  disabled?: boolean;
  /**
   * Displays a spinner in the field.
   */
  loading?: boolean;
  /**
   * Explanation or precisions about what the field is for.
   */
  help?: HelpPublicProps['help'];
  /**
   * Error message.
   */
  error?: HelpPublicProps['error'];
  /**
   * Class applied to the highlighted option.
   */
  highlightClassName?: string;
  /**
   * Size for input.
   */
  size?: number;
  /**
   * Focus input on mount.
   */
  autoFocus?: boolean;
  /**
   * Input Classnames
   */
  inputClassName?: string;
  /**
   * Indicates if there are more items to load. If this prop is used, the `loadMore` prop should also be set.
   */
  hasMore?: boolean;
  /**
   * Function to load more items. Should be set if `hasMore` prop is used.
   */
  loadMore?: () => void;
  /**
   * Total number of options before filtering.
   */
  optionsCount?: number;
  /**
   * Opt into virtualization. Use this when working with long option lists.
   */
  virtualizeOptionList?: boolean;
  /**
   * When virtualization is active, you can specify a custom height of the option list's elements. This prop has no effect when virtualization is off.
   */
  optionItemSize?: (index: number) => number;
}

export type SearchSelectCanCreateCallback = (value: string) => boolean;
export type SearchSelectOnCreateCallback<OptionType> = (
  value: string,
  select: (option: OptionType | undefined) => void,
) => void;
export type SearchSelectRenderCreateCallback = (value: string) => ReactNode;

export interface SearchSelectProps<OptionType>
  extends SimpleSearchSelectProps<OptionType> {
  getValue: GetValue<OptionType>;
  renderOption: RenderOption<OptionType>;
}

/**
 * Specs of the component: https://github.com/zakodium/components/wiki/Component-specifications#search-select-components
 */
export const SearchSelect = forwardRefWithGeneric(SearchSelectForwardRef);

function SearchSelectForwardRef<OptionType>(
  props: OptionType extends SimpleSelectOption
    ? SimpleSearchSelectProps<OptionType>
    : SearchSelectProps<OptionType>,
  ref: Ref<HTMLInputElement>,
): ReactElement {
  const {
    onSearchChange,
    options,
    onChange: onSelect,
    selected,
    getValue = defaultGetValue,
    renderOption = defaultRenderOption,
    renderSelectedOption,

    closeListOnSelect = true,
    clearSearchOnSelect = true,
    onCreate,
    canCreate = defaultCanCreate,
    renderCreate = defaultRenderCreate,
    optionItemSize,
    virtualizeOptionList,
    ...otherProps
  } = props;

  const finalRenderSelectedOption = renderSelectedOption || renderOption;

  const formattedSelected = useMemo(() => {
    if (selected) {
      return {
        value: getValue(selected),
        label: finalRenderSelectedOption(selected),
      };
    }
  }, [selected, getValue, finalRenderSelectedOption]);

  const internalProps = useSearchSelectInternals({
    defaultFocusItem: 'selected',
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
    formattedSelected,
    selected: selected ? [selected] : [],
    pinSelectedOptions: false,
    optionItemSize,
    virtualizeOptionList,
    hasMore: otherProps.hasMore,
    loadMore: otherProps.loadMore,
    optionsCount: otherProps.optionsCount,
  });

  return (
    <InternalSearchSelect
      {...internalProps}
      {...otherProps}
      inputRef={ref}
      formattedSelected={formattedSelected}
      hasClearableValue={formattedSelected !== undefined}
      virtualizeOptionList={virtualizeOptionList}
    />
  );
}
