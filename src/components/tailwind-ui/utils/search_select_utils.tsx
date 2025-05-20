import type { useFloating, useInteractions } from '@floating-ui/react';
import {
  FloatingFocusManager,
  FloatingList,
  useListItem,
} from '@floating-ui/react';
import {
  ChevronDownIcon,
  PlusCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import type { VirtualItem } from '@tanstack/react-virtual';
import clsx from 'clsx';
import type {
  ChangeEvent,
  MouseEvent,
  MutableRefObject,
  ReactElement,
  ReactNode,
  Ref,
  RefObject,
} from 'react';
import { Fragment, useCallback, useEffect, useMemo } from 'react';

import { Spinner } from '../elements/spinner/Spinner';
import { Checkbox } from '../forms/basic/checkbox/Checkbox';
import type { HelpPublicProps } from '../forms/basic/common';
import {
  Help,
  InputCorner,
  InputErrorIcon,
  Label,
} from '../forms/basic/common';
import { Input } from '../forms/basic/input/Input';
import type { SearchSelectContext } from '../forms/basic/search_select/SearchSelectContext';
import {
  searchSelectContext,
  useSearchSelectContext,
} from '../forms/basic/search_select/SearchSelectContext';
import type { UseSearchSelectVirtualizerReturn } from '../forms/basic/search_select/useSearchSelectVirtualizer';
import {
  getInputBackground,
  getInputColor,
  getInputPlaceholder,
  inputOutline,
  inputText,
} from '../forms/basic/utils.common';
import { useInputId } from '../hooks/useInputId';

import {
  defaultNoResultsHint,
  preventDefault,
} from './defaultSearchSelectUtils';
import { LOAD_MORE } from './hooks/useSearchSelectInternals';

export type OptionsFilter<OptionType> = (
  query: string,
  options: OptionType[],
) => OptionType[];

export type IsOptionRemovableCallback<OptionType> = (
  option: OptionType,
) => boolean;

export type InternalOption<OptionType> =
  | {
      type: 'option';
      value: string | number | symbol;
      label: ReactNode;
      originalValue: OptionType;
      selected: boolean;
      removable: boolean;
    }
  | {
      type: 'create';
      value: '___internal_create___';
      label: ReactNode;
      originalValue: string;
      selected: false;
      removable: false;
    };

export interface FormattedOptionProps<OptionType> {
  option: InternalOption<OptionType>;
  highlightClassName: string;
  showSelected: boolean;
  virtualItem: VirtualItem | null;
  elementsRef: MutableRefObject<Array<HTMLElement | null>>;
}

export function FormattedOption<OptionType>(
  props: FormattedOptionProps<OptionType>,
) {
  const { option, showSelected, highlightClassName, virtualItem, elementsRef } =
    props;

  const { getItemProps, activeIndex, selectedIndex, handleSelect } =
    useSearchSelectContext();

  const { ref: listItemRef, index: listItemIndex } = useListItem();
  const index = virtualItem ? virtualItem.index : listItemIndex;

  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      ref={(node) => {
        if (virtualItem) {
          elementsRef.current[index] = node;
        } else {
          listItemRef(node);
        }
      }}
      role="option"
      type="button"
      tabIndex={-1}
      style={
        virtualItem ? { transform: `translateY(${virtualItem.start}px)` } : {}
      }
      aria-selected={isActive && isSelected}
      className={clsx(
        option.value === LOAD_MORE && 'group border-t border-neutral-200',
        isActive
          ? option.value !== LOAD_MORE && highlightClassName
          : 'text-neutral-900',
        'top-0 left-0 w-full truncate px-3 py-2 text-left text-sm',
        {
          absolute: virtualItem,
        },
      )}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      {showSelected ? (
        <div className="flex items-center">
          {option.type === 'create' ? (
            <PlusCircleIcon className="mr-3 -ml-0.5 size-5 text-primary-600" />
          ) : (
            <Checkbox
              readOnly
              tabIndex={-1}
              checked={option.selected}
              disabled={!option.removable}
              name={String(option.value)}
            />
          )}

          <div
            className={clsx({
              'text-neutral-500': !option.removable && option.selected,
            })}
          >
            {option.label}
          </div>
        </div>
      ) : option.selected ? null : (
        option.label
      )}
    </button>
  );
}

interface UseSearchSelectInternalsReturn<OptionType> {
  closeList: () => void;
  isListOpen: boolean;
  formattedOptions: Array<InternalOption<OptionType>>;
  activeIndex: number | null;
  showSelected: boolean;
  onSelect: (option: InternalOption<OptionType>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleXClick: (event: MouseEvent) => void;
  floating: ReturnType<typeof useFloating>;
  interactions: ReturnType<typeof useInteractions>;
  elementsRef: MutableRefObject<Array<HTMLElement | null>>;
  selectedIndex: number | null;
  wrapperRef: RefObject<HTMLDivElement>;
}

interface InternalSearchSelectProps<OptionType>
  extends UseSearchSelectInternalsReturn<OptionType> {
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  noResultsHint?: ReactNode;
  help?: HelpPublicProps['help'];
  error?: HelpPublicProps['error'];
  label: ReactNode;
  hiddenLabel?: boolean;
  corner?: ReactNode;
  placeholder?: string;
  searchValue: string;

  formattedSelected?: { value: string | number; label: ReactNode };
  showSelected: boolean;
  hasClearableValue: boolean;
  highlightClassName?: string;
  required?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  name?: string;
  id?: string;

  size?: number;

  inputClassName?: string;
  hasMore?: boolean;
  loadMore?: () => void;
  optionsCount?: number;
  searchSelectVirtualizer: UseSearchSelectVirtualizerReturn<OptionType>;
  setPointer: (pointer: boolean) => void;
  virtualizeOptionList: boolean;
}

export function InternalSearchSelect<OptionType>(
  props: InternalSearchSelectProps<OptionType>,
): ReactElement {
  const {
    inputRef,
    isListOpen,
    formattedOptions,
    onSelect,
    handleXClick,
    clearable = false,
    disabled = false,
    required = false,
    loading = false,
    autoFocus = false,
    noResultsHint = defaultNoResultsHint,
    error,
    help,
    label,
    name,
    id,
    hiddenLabel,
    corner,
    placeholder,
    searchValue,
    formattedSelected,
    hasClearableValue,
    highlightClassName = '',
    showSelected = false,
    size,
    inputClassName,
    handleChange,
    activeIndex,
    selectedIndex,
    interactions,
    floating,
    elementsRef,
    hasMore,
    loadMore,
    optionsCount,
    searchSelectVirtualizer,
    setPointer,
    virtualizeOptionList,
    wrapperRef,
  } = props;

  const finalId = useInputId(id, name);

  const finalHighlightClassName =
    highlightClassName ||
    (showSelected ? 'bg-neutral-200' : 'text-white bg-primary-600');

  const handleSelect = useCallback(
    (index: number | null) => {
      if (index !== null && formattedOptions.at(index)) {
        const element = formattedOptions.at(index);

        if (element) {
          return onSelect(element);
        }
      }
    },
    [formattedOptions, onSelect],
  );

  const searchSelectContextValue = useMemo<SearchSelectContext>(() => {
    return {
      handleSelect,
      activeIndex,
      selectedIndex,
      getItemProps: interactions.getItemProps,
      virtualizer: searchSelectVirtualizer,
      setPointer,
      virtualizeOptionList,
      wrapperRef,
    };
  }, [
    handleSelect,
    activeIndex,
    selectedIndex,
    interactions.getItemProps,
    searchSelectVirtualizer,
    setPointer,
    virtualizeOptionList,
    wrapperRef,
  ]);

  return (
    <div>
      <Input
        id={finalId}
        name={name}
        inputClassName={inputClassName}
        autoFocus={autoFocus}
        ref={inputRef}
        required={required}
        wrapperRef={props.floating.refs.setReference}
        type="text"
        label={label}
        hiddenLabel={hiddenLabel}
        corner={corner}
        value={searchValue}
        disabled={disabled}
        size={size}
        error={error}
        help={help}
        autoComplete="off"
        onChange={handleChange}
        placeholder={placeholder}
        inlinePlaceholder={
          formattedSelected && !searchValue
            ? formattedSelected.label
            : undefined
        }
        trailingInlineAddon={
          <TrailingTools
            {...{
              loading,
              clearable,
              hasClearableValue,
              disabled,
              handleXClick,
            }}
          />
        }
        {...props.interactions.getReferenceProps()}
      />

      <searchSelectContext.Provider value={searchSelectContextValue}>
        {isListOpen && (
          <FloatingFocusManager
            initialFocus={-1}
            context={floating.context}
            modal={false}
          >
            <OptionsList
              optionsCount={optionsCount}
              refs={floating.refs}
              elementsRef={elementsRef}
              floatingStyles={floating.floatingStyles}
              getFloatingProps={interactions.getFloatingProps}
              formattedOptions={formattedOptions}
              noResultsHint={noResultsHint}
              highlightClassName={finalHighlightClassName}
              showSelected={showSelected}
              hasMore={hasMore}
              loadMore={loadMore}
            />
          </FloatingFocusManager>
        )}
      </searchSelectContext.Provider>
    </div>
  );
}

interface InternalMultiSearchSelectProps<OptionType>
  extends InternalSearchSelectProps<OptionType> {
  selectedBadges?: ReactNode[];
  showSelected: boolean;
}

export function InternalMultiSearchSelect<OptionType>(
  props: InternalMultiSearchSelectProps<OptionType>,
): ReactElement {
  const {
    inputRef,
    isListOpen,
    formattedOptions,
    onSelect,
    handleChange,
    handleXClick,

    clearable = false,
    disabled = false,
    required = false,
    loading = false,
    autoFocus = false,
    noResultsHint,
    error,
    help,
    label,
    hiddenLabel,
    corner,
    placeholder,
    searchValue,
    selectedBadges,
    hasClearableValue,
    id,
    name,
    highlightClassName,
    showSelected = false,
    activeIndex,
    selectedIndex,
    interactions,
    floating,
    elementsRef,
    hasMore,
    loadMore,
    optionsCount,
    searchSelectVirtualizer,
    setPointer,
    virtualizeOptionList,
    wrapperRef,
  } = props;

  const elementId = useInputId(id, name);

  const finalHighlightClassName =
    highlightClassName ||
    (showSelected ? 'bg-neutral-200' : 'text-white bg-primary-600');

  const handleSelect = useCallback(
    (index: number | null) => {
      if (index !== null && formattedOptions.at(index)) {
        const element = formattedOptions.at(index);

        if (element) {
          return onSelect(element);
        }
      }
    },
    [formattedOptions, onSelect],
  );

  const searchSelectContextValue = useMemo<SearchSelectContext>(() => {
    return {
      handleSelect,
      activeIndex,
      selectedIndex,
      getItemProps: interactions.getItemProps,
      virtualizer: searchSelectVirtualizer,
      setPointer,
      virtualizeOptionList,
      wrapperRef,
    };
  }, [
    handleSelect,
    activeIndex,
    selectedIndex,
    interactions.getItemProps,
    searchSelectVirtualizer,
    setPointer,
    virtualizeOptionList,
    wrapperRef,
  ]);

  return (
    <div className="flex max-w-full flex-col">
      <div className="flex items-baseline justify-between gap-2">
        <Label
          id={elementId}
          text={label}
          hidden={hiddenLabel}
          required={required}
          disabled={disabled}
        />
        <InputCorner>{corner}</InputCorner>
      </div>
      <label
        ref={floating.refs.setReference}
        htmlFor={elementId}
        className={clsx(
          'max-w-full px-3 py-2',
          'relative flex flex-1 flex-row shadow-xs',
          'rounded-md',
          inputText,
          inputOutline,
          getInputBackground(disabled),
          getInputColor(error, false),
          {
            'mt-1': !hiddenLabel || corner,
          },
        )}
      >
        <div className="flex flex-1 flex-row flex-wrap gap-1.5 truncate">
          {selectedBadges}
          <input
            id={elementId}
            name={name}
            ref={inputRef}
            type="text"
            value={searchValue}
            size={Math.max(5, placeholder?.length || 0, searchValue.length)}
            disabled={disabled}
            autoFocus={autoFocus}
            autoComplete="off"
            onChange={handleChange}
            placeholder={placeholder}
            {...interactions.getReferenceProps()}
            className={clsx(
              'flex-1 p-0 focus:outline-hidden',
              getInputColor(error, false),
              getInputPlaceholder(error, false),
            )}
          />
        </div>
        <TrailingTools
          loading={loading}
          clearable={clearable}
          hasClearableValue={hasClearableValue}
          hasError={Boolean(error)}
          disabled={disabled}
          handleXClick={handleXClick}
        />
      </label>
      <Help error={error} help={help} />

      <searchSelectContext.Provider value={searchSelectContextValue}>
        {isListOpen && (
          <FloatingFocusManager
            initialFocus={-1}
            returnFocus={false}
            context={props.floating.context}
            modal={false}
          >
            <OptionsList
              optionsCount={optionsCount}
              refs={floating.refs}
              elementsRef={elementsRef}
              floatingStyles={floating.floatingStyles}
              getFloatingProps={interactions.getFloatingProps}
              formattedOptions={formattedOptions}
              noResultsHint={noResultsHint}
              highlightClassName={finalHighlightClassName}
              showSelected={showSelected}
              hasMore={hasMore}
              loadMore={loadMore}
            />
          </FloatingFocusManager>
        )}
      </searchSelectContext.Provider>
    </div>
  );
}

type OptionsListProps<OptionType> = Pick<
  UseSearchSelectInternalsReturn<OptionType>,
  'formattedOptions' | 'elementsRef'
> &
  Pick<
    InternalSearchSelectProps<OptionType>,
    'noResultsHint' | 'highlightClassName' | 'optionsCount'
  > &
  Pick<
    UseSearchSelectInternalsReturn<OptionType>['floating'],
    'refs' | 'floatingStyles'
  > &
  Pick<
    UseSearchSelectInternalsReturn<OptionType>['interactions'],
    'getFloatingProps'
  > & {
    showSelected: boolean;
    hasMore?: boolean;
    loadMore?: () => void;
  };

function OptionsList<OptionType>(props: OptionsListProps<OptionType>) {
  const {
    formattedOptions,
    noResultsHint = defaultNoResultsHint,
    highlightClassName = 'text-white bg-primary-600',
    showSelected,
    refs,
    floatingStyles,
    getFloatingProps,
    elementsRef,
  } = props;

  const finalFormattedOptions = showSelected
    ? formattedOptions
    : formattedOptions.filter((option) => !option.selected);

  const {
    virtualizer: { getSearchSelectItems },
    setPointer,
    virtualizeOptionList,
  } = useSearchSelectContext();

  const FloatingListContainer = virtualizeOptionList
    ? VirtualizedListContainer
    : Fragment;

  useEffect(() => {
    // Reset the pointer each time your re-render the list. Used to scroll to the correct element
    setPointer(false);
  }, [setPointer]);

  return (
    <div
      style={floatingStyles}
      ref={refs.setFloating}
      tabIndex={0}
      {...getFloatingProps({
        onKeyDown: () => setPointer(false),
        onPointerMove: () => setPointer(true),
      })}
      onMouseDown={(event) => {
        // Prevent losing focus on the input when clicking on the scrollbar.
        if (event.target === event.currentTarget) {
          event.preventDefault();
        }
      }}
      className="z-20 max-h-60 w-full cursor-default overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-hidden"
    >
      {finalFormattedOptions.length === 0 ? (
        <div className="p-2">{noResultsHint}</div>
      ) : (
        <FloatingListContainer>
          <FloatingList elementsRef={elementsRef}>
            {getSearchSelectItems().map(({ option, virtualItem }) => (
              <FormattedOption
                key={String(option.value)}
                option={option}
                highlightClassName={highlightClassName}
                showSelected={showSelected}
                virtualItem={virtualItem}
                elementsRef={elementsRef}
              />
            ))}
          </FloatingList>
        </FloatingListContainer>
      )}
    </div>
  );
}

interface TrailingToolsProps {
  loading?: boolean;
  clearable?: boolean;
  hasClearableValue: boolean;
  hasError?: boolean;
  disabled?: boolean;
  handleXClick: (event: MouseEvent) => void;
}

export function TrailingTools(props: TrailingToolsProps) {
  const {
    loading,
    clearable,
    hasClearableValue,
    hasError,
    disabled,
    handleXClick,
  } = props;

  return (
    <div className="inline-flex cursor-default flex-row items-center text-neutral-400">
      {loading && <Spinner className="mr-1 size-5 text-neutral-400" />}
      {clearable && hasClearableValue && !disabled && (
        <XMarkIcon
          className="size-4 hover:text-neutral-500"
          onClick={handleXClick}
        />
      )}
      {/* font-mono so the vertical bar is vertically aligned with the SVG */}
      <span className="mx-1 font-mono font-light">{` | `}</span>
      <ChevronDownIcon
        className={clsx({
          'size-5': true,
          'hover:text-neutral-500': !disabled,
        })}
        onMouseDown={preventDefault}
      />
      {hasError && <InputErrorIcon />}
    </div>
  );
}

interface WrapperProps {
  children: ReactNode;
}

function VirtualizedListContainer(props: WrapperProps) {
  const {
    virtualizer: {
      virtualizer: { getTotalSize },
    },
    wrapperRef,
  } = useSearchSelectContext();

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: getTotalSize() }}
    >
      {props.children}
    </div>
  );
}
