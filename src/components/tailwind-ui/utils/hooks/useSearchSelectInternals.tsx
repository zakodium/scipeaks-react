import type { OpenChangeReason } from '@floating-ui/react';
import {
  autoUpdate,
  flip,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type {
  ChangeEvent,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  RefObject,
} from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type {
  SearchSelectCanCreateCallback,
  SearchSelectOnCreateCallback,
  SearchSelectRenderCreateCallback,
} from '../../forms/basic/search_select/SearchSelect';
import type { UseSearchSelectVirtualizerReturn } from '../../forms/basic/search_select/useSearchSelectVirtualizer';
import { useSearchSelectVirtualizer } from '../../forms/basic/search_select/useSearchSelectVirtualizer';
import type { GetValue, RenderOption } from '../../forms/basic/select/Select';
import { useOnOff } from '../../hooks/useOnOff';
import { TranslationsText } from '../../internationalization/TranslationsText';
import type {
  InternalOption,
  IsOptionRemovableCallback,
} from '../search_select_utils';

import { useFloatingEnterAsSelector } from './useFloatingEnterAsSelector';
import { useFloatingFocusOut } from './useFloatingFocusOut';

interface UseSearchSelectInternalsConfig<OptionType> {
  showSelected: boolean;
  selected: OptionType[];
  filteredSelected?: OptionType[];
  searchValue: string;
  onSearchChange: (newValue: string) => void;
  options: OptionType[];
  onSelect: (option: OptionType | undefined, remove?: boolean) => void;
  getValue: GetValue<OptionType>;
  renderOption: RenderOption<OptionType>;
  closeListOnSelect: boolean;
  clearSearchOnSelect: boolean;
  onCreate?: SearchSelectOnCreateCallback<OptionType>;
  canCreate: SearchSelectCanCreateCallback;
  renderCreate: SearchSelectRenderCreateCallback;
  isOptionRemovable?: IsOptionRemovableCallback<OptionType>;
  onBackspace?: () => void;
  pinSelectedOptions: boolean;
  formattedSelected?: { value: string | number; label: ReactNode };
  defaultFocusItem: 'selected' | 'first';
  /**
   * Opt into virtualization. Use this when working with long option lists.
   */
  virtualizeOptionList?: boolean;
  /**
   * when virtualization is active, you can specify a custom height of the option list's elements. This prop has no effect when virtualization is off.
   */
  optionItemSize?: (index: number) => number;

  hasMore?: boolean;
  loadMore?: () => void;
  optionsCount?: number;
}

interface UseSearchSelectInternalsReturn<OptionType> {
  closeList: () => void;
  openList: () => void;
  isListOpen: boolean;
  formattedOptions: Array<InternalOption<OptionType>>;
  activeIndex: number | null;
  showSelected: boolean;
  setActiveIndex: (newFocus: number) => void;
  onSelect: (option: InternalOption<OptionType>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleXClick: (event: MouseEvent) => void;
  floating: ReturnType<typeof useFloating>;
  interactions: ReturnType<typeof useInteractions>;
  elementsRef: MutableRefObject<Array<HTMLElement | null>>;
  selectedIndex: number | null;
  searchSelectVirtualizer: UseSearchSelectVirtualizerReturn<OptionType>;
  setPointer: (pointer: boolean) => void;
  virtualizeOptionList: boolean;
  wrapperRef: RefObject<HTMLDivElement>;
}

export const LOAD_MORE = Symbol('__LOAD_MORE__');

export function useSearchSelectInternals<OptionType>(
  config: UseSearchSelectInternalsConfig<OptionType>,
): UseSearchSelectInternalsReturn<OptionType> {
  const {
    showSelected,
    selected,
    filteredSelected,
    searchValue,
    onSearchChange,
    options,
    onSelect,
    getValue,
    renderOption,
    closeListOnSelect,
    clearSearchOnSelect,
    onCreate,
    canCreate,
    formattedSelected,
    renderCreate,
    isOptionRemovable,
    pinSelectedOptions,
    defaultFocusItem,
    optionItemSize,
    virtualizeOptionList = false,
    hasMore,
    loadMore,
    optionsCount,
  } = config;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState(false);
  const [isListOpen, openList, closeList] = useOnOff(false);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const getPinnedOptions = useRef(
    createGetPinnedOptions<OptionType>(searchValue, isListOpen),
  );

  const pinnedOptions = getPinnedOptions.current(
    searchValue,
    isListOpen,
    selected,
  );

  const createValue =
    onCreate && searchValue && canCreate(searchValue) ? searchValue : undefined;

  const formattedOptions = useMemo(() => {
    const opts = buildInternalOptions(
      options,
      getValue,
      renderOption,
      renderCreate,
      selected,
      showSelected,
      isOptionRemovable,
      createValue,
      filteredSelected,
      formattedSelected,
      pinSelectedOptions,
      pinnedOptions,
    );

    if (hasMore && loadMore) {
      opts.push({
        type: 'option' as const,
        value: LOAD_MORE,
        label: (
          <button
            type="button"
            onClick={loadMore}
            tabIndex={-1}
            className="flex w-full cursor-pointer items-center justify-between text-neutral-600"
          >
            <span
              className={clsx(
                'flex gap-2 text-primary-600 group-hover:underline',
                {
                  underline: activeIndex === opts.length,
                },
              )}
            >
              <ArrowPathRoundedSquareIcon className="size-5" />
              <TranslationsText textKey="searchselect.more.button" />
            </span>

            <TranslationsText
              textKey="searchselect.more.information"
              // eslint-disable-next-line camelcase
              values={{ num_options: optionsCount }}
            />
          </button>
        ),
        originalValue: {} as OptionType,
        selected: false,
        removable: false,
      } satisfies InternalOption<OptionType>);
    }

    return opts;
  }, [
    options,
    getValue,
    renderOption,
    renderCreate,
    selected,
    showSelected,
    isOptionRemovable,
    createValue,
    filteredSelected,
    formattedSelected,
    pinSelectedOptions,
    pinnedOptions,
    hasMore,
    loadMore,
    activeIndex,
    optionsCount,
  ]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isListOpen && event.target.value !== ' ') {
      openList();
    }

    if (event.target.value === ' ') {
      event.target.value = '';

      if (isListOpen) closeList();
      else openList();

      return;
    }

    onSearchChange(event.target.value);
  }

  const onOpenChange = useCallback(
    (value: boolean, event: Event, reason: OpenChangeReason) => {
      // Close the floating element when clicking outside ou press the escape key only
      if (reason === 'outside-press' || reason === 'escape-key') {
        return closeList();
      }

      if (value) {
        return openList();
      }

      return null;
    },
    [closeList, openList],
  );

  const floating = useFloating({
    placement: 'bottom-start',
    open: isListOpen,
    onOpenChange,
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
      flip(),
    ],
  });

  const searchSelectVirtualizer = useSearchSelectVirtualizer(
    formattedOptions,
    floating.refs.floating,
    {
      estimateSize: optionItemSize,
      virtualizeOptionList,
    },
  );

  useLayoutEffect(() => {
    const shouldFocus =
      floating.isPositioned && activeIndex !== null && !pointer && wrapperRef;
    if (shouldFocus) {
      wrapperRef.current?.focus({ preventScroll: true });
      searchSelectVirtualizer.virtualizer.scrollToIndex(activeIndex);
    }
  }, [
    pointer,
    activeIndex,
    floating.isPositioned,
    searchSelectVirtualizer.virtualizer,
  ]);

  function selectOption(option: InternalOption<OptionType>): void {
    if (!option) return;

    if (option.type === 'option') {
      if (option.value === LOAD_MORE && loadMore) {
        return loadMore();
      }

      if (option.selected) {
        if (option.removable) {
          onSelect(option.originalValue, true);
        }
        // Do not remove if not removable
      } else {
        onSelect(option.originalValue, false);
      }
    } else {
      onCreate?.(option.originalValue, onSelect);
    }

    if (closeListOnSelect) {
      closeList();
    }

    if (clearSearchOnSelect) {
      onSearchChange('');
    }

    const $reference = floating.context.refs.reference.current as HTMLElement;
    const $input = $reference?.querySelector('input');
    $input?.focus();
  }

  function handleXClick(event: MouseEvent) {
    event.preventDefault();
    onSelect(undefined);
  }

  const elementsRef = useElementsRef(formattedOptions);

  const selectedIndex = useMemo(() => {
    const firstSelected = selected.at(0);

    if (firstSelected) {
      const index = options.indexOf(firstSelected);
      return index === -1 ? 0 : index;
    }

    return null;
  }, [options, selected]);

  const click = useClick(floating.context, {
    keyboardHandlers: false,
  });

  const dismiss = useDismiss(floating.context);
  const role = useRole(floating.context, { role: 'listbox' });
  const focusOut = useFloatingFocusOut(closeList);

  const enterAsSelector = useFloatingEnterAsSelector(() => {
    if (!isListOpen) return openList();
    selectOption(formattedOptions[activeIndex ?? 0]);
  });

  const listNav = useListNavigation(floating.context, {
    listRef: elementsRef,
    activeIndex,
    // When no selection is made, pretend the first one is in order to automatically
    // focus it and make navigation more effective
    selectedIndex: defaultFocusItem === 'selected' ? (selectedIndex ?? 0) : 0,
    virtual: true,
    loop: true,
    onNavigate: setActiveIndex,
    disabledIndices: [],
  });

  const interactions = useInteractions([
    role,
    dismiss,
    listNav,
    click,
    enterAsSelector,
    focusOut,
  ]);

  return {
    closeList,
    openList,
    isListOpen,
    formattedOptions,
    activeIndex,
    setActiveIndex,
    onSelect: selectOption,
    handleChange,
    handleXClick,
    showSelected,
    floating,
    elementsRef,
    interactions,
    selectedIndex,
    searchSelectVirtualizer,
    setPointer,
    virtualizeOptionList,
    wrapperRef,
  };
}

function buildInternalOptions<OptionType>(
  // List of options, including the selected ones (duplicated in order to preserve order)
  options: OptionType[],
  getValue: GetValue<OptionType>,
  renderOption: RenderOption<OptionType>,
  renderCreate: SearchSelectRenderCreateCallback,
  selected: OptionType[],
  showSelected: boolean,
  isOptionRemovable?: IsOptionRemovableCallback<OptionType>,
  createValue?: string,

  // list of every filtered options
  filteredSelected?: OptionType[],
  formattedSelected?: { value: string | number; label: ReactNode },
  pinSelectedOptions = false,

  // liste des options sélectionnées au moment de l’ouverture du dropdown filtrés
  pinnedOptions?: OptionType[],
): Array<InternalOption<OptionType>> {
  const internalOptions: Array<InternalOption<OptionType>> = [];

  const pinFiltered =
    pinnedOptions?.filter(
      (el) =>
        filteredSelected?.some(
          (filtered) => getValue(filtered) === getValue(el),
        ) || options.some((opt) => getValue(opt) === getValue(el)),
    ) || [];

  if (showSelected) {
    // Start with options which are selected but not in the list (in case of pagination)
    const optionsAdditionnalPinned =
      filteredSelected?.filter(
        (option) => !options?.some((opt) => getValue(opt) === getValue(option)),
      ) || [];

    let renderOptions = [...optionsAdditionnalPinned, ...options];

    if (pinSelectedOptions) {
      // Create 2 array from options, to separate the pinned and not pinned one (if containing in pinFiltered)
      const pinned: OptionType[] = [];
      const notPinned: OptionType[] = [];
      for (const option of options) {
        const isPinned = pinFiltered.some(
          (otherOption) => getValue(otherOption) === getValue(option),
        );
        if (isPinned) {
          pinned.push(option);
        } else {
          notPinned.push(option);
        }
      }

      renderOptions = [...optionsAdditionnalPinned, ...pinned, ...notPinned];
    }

    internalOptions.push(
      ...renderOptions.map((option) => {
        const value = getValue(option);
        return {
          type: 'option' as const,
          value: getValue(option),
          label: renderOption(option),
          originalValue: option,
          selected: selected.some(
            (selectedOption) => getValue(selectedOption) === value,
          ),
          removable: isOptionRemovable?.(option) || false,
        };
      }),
    );
  } else {
    const optionsToShow = options.filter((option) => {
      const value = getValue(option);
      return (
        value === formattedSelected?.value ||
        !selected.some((selectedOption) => getValue(selectedOption) === value)
      );
    });
    internalOptions.push(
      ...optionsToShow.map((option) => ({
        type: 'option' as const,
        value: getValue(option),
        label: renderOption(option),
        originalValue: option,
        selected: false,
        removable: isOptionRemovable?.(option) || false,
      })),
    );
  }
  if (createValue) {
    internalOptions.push({
      type: 'create',
      value: '___internal_create___',
      label: renderCreate(createValue),
      originalValue: createValue,
      selected: false,
      removable: false,
    });
  }

  return internalOptions;
}

// Pinned options are updated when the list opens, or when the search value changes
function createGetPinnedOptions<OptionType>(
  initialSearchValue: string,
  initialIsOpen: boolean,
) {
  let searchValueCached = initialSearchValue;
  let isOpenCached = initialIsOpen;
  let result: OptionType[] | undefined;
  return (searchValue: string, isOpen: boolean, options: OptionType[]) => {
    if (
      searchValueCached !== searchValue ||
      isOpenCached !== isOpen ||
      result === undefined
    ) {
      searchValueCached = searchValue;
      isOpenCached = isOpen;
      result = options;
      return result;
    }
    return result;
  };
}

function useElementsRef(options: unknown[]) {
  const elementsRef = useRef<Array<HTMLElement | null>>(
    options.map(() => null),
  );

  useEffect(() => {
    // Keep elementsRef in sync when the list of options changes.
    // Having the correct length in this list is important to get the correct active element index when looping.
    const previousLength = elementsRef.current.length;
    elementsRef.current.length = options.length;
    if (previousLength > options.length) {
      for (let idx = 0; idx < elementsRef.current.length; idx++) {
        if (elementsRef.current[idx] === undefined) {
          elementsRef.current[idx] = null;
        }
      }
    }
  }, [options]);
  return elementsRef;
}
