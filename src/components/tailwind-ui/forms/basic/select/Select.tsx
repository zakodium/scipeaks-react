import { XMarkIcon } from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/24/outline';
import * as RadixSelect from '@radix-ui/react-select';
import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';

import { useInputId } from '../../../hooks/useInputId';
import { Portal } from '../../../overlays/Portal';
import type { Size } from '../../../types';
import {
  defaultGetValue,
  defaultRenderOption,
} from '../../../utils/defaultSearchSelectUtils';
import type { HelpPublicProps } from '../common';
import { Help, InputCorner, Label } from '../common';
import {
  getInputBackground,
  getInputColor,
  inputOutline,
} from '../utils.common';

export interface SimpleStringSelectOption {
  value: string;
  label: ReactNode;
}

export interface SimpleNumberSelectOption {
  value: number;
  label: ReactNode;
}

export type GetValue<OptionType> = (option: OptionType) => string | number;
export type RenderOption<OptionType> = (option: OptionType) => ReactNode;

export type SimpleSelectOption =
  | string
  | number
  | SimpleStringSelectOption
  | SimpleNumberSelectOption;

export interface SelectProps<OptionType> extends SimpleSelectProps<OptionType> {
  /**
   * Function to get the value that uniquely identifies each option.
   */
  getValue: GetValue<OptionType>;
  /**
   * Custom function to render each option.
   */
  renderOption: RenderOption<OptionType>;
}

export interface SimpleSelectProps<OptionType> {
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
  onChange: (selected: OptionType | undefined) => void;

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
   * Field label.
   */
  label?: ReactNode;
  /**
   * Field name.
   */
  name?: string;
  /**
   * Field id.
   */
  id?: string;
  /**
   * Do not display the label.
   */
  hiddenLabel?: boolean;
  /**
   * Explanation or precisions about what the field is for.
   */
  help?: HelpPublicProps['help'];
  /**
   * Error message.
   */
  error?: HelpPublicProps['error'];
  /**
   * Placeholder to display when no value is selected.
   */
  placeholder?: string;

  /**
   * Adds a red * to the label.
   */
  required?: boolean;
  /**
   * Allows to unselect the currently selected value.
   */
  clearable?: boolean;
  /**
   * Disable interactions with the field.
   */
  disabled?: boolean;

  /**
   * Class applied to the outermost div element.
   */
  className?: string;
  /**
   * Class applied to the highlighted option.
   */
  highlightClassName?: string;
  /**
   * Custom react node to display in the upper right corner of the input
   */
  corner?: ReactNode;
  /**
   * Hint to display when the number of options is equal to zero
   */
  emptyHint?: ReactNode;
  /**
   * Size of the element.
   */
  size?: Size;
  /**
   * Disable the default behavior of the options list which is
   * to have the same width as the select button.
   */
  fluidListBox?: boolean;
  listBoxPlacement?: 'start' | 'end';
}

const listBoxAndButtonSizes: Record<Size, string> = {
  xSmall: 'py-1.5 text-sm sm:text-xs',
  small: 'py-2 sm:text-sm',
  medium: 'py-2 sm:text-sm',
  large: 'py-2 text-base',
  xLarge: 'py-3 text-base',
};

const buttonSizes: Record<Size, string> = {
  xSmall: 'pl-2 pr-8',
  small: 'pl-2 pr-8',
  medium: 'pl-3 pr-9',
  large: 'pl-3 pr-9',
  xLarge: 'pl-5 pr-11',
};

export function Select<OptionType>(
  props: OptionType extends SimpleSelectOption
    ? SimpleSelectProps<OptionType>
    : SelectProps<OptionType>,
): ReactElement {
  const {
    options,
    selected,
    onChange,
    className,
    label,
    id,
    name,
    hiddenLabel = false,
    error,
    help,
    placeholder,
    required = false,
    clearable = false,
    disabled = false,
    corner,
    getValue = defaultGetValue,
    renderOption = defaultRenderOption,
    renderSelectedOption,
    highlightClassName = 'data-highlighted:text-white data-highlighted:bg-primary-600',
    emptyHint = 'No options available',
    size = 'medium',
    fluidListBox = false,
    listBoxPlacement = 'start',
  } = props;

  const finalId = useInputId(id, name);

  const finalRenderSelectedOption = renderSelectedOption || renderOption;
  const selectedValue = selected ? getValue(selected) : undefined;

  if (
    selected &&
    !options.some((element) => getValue(element) === selectedValue)
  ) {
    throw new Error(
      'Select component contains a selected value that is not in options',
    );
  }

  function handleChange(value: string) {
    const option = options.find((option) => {
      // use flaky eq to compare numbers and strings
      // eslint-disable-next-line eqeqeq
      return getValue(option) == value;
    });

    onChange(option);
  }

  return (
    <div className={className}>
      <div
        className="relative flex-1"
        ref={(node) => {
          // RadixSelect.Root don't expose id prop
          const select = node?.querySelector('select');
          if (!select) return;
          select.id = finalId;
        }}
      >
        <div className="flex items-end justify-between gap-2">
          <Label
            id={finalId}
            text={label}
            hidden={hiddenLabel}
            required={required}
            disabled={disabled}
          />
          <InputCorner>{corner}</InputCorner>
        </div>

        <RadixSelect.Root
          // Empty string is used to reset the value and display the placeholder automatically
          // https://github.com/radix-ui/primitives/issues/2706#issuecomment-2353379187
          value={selected ? String(getValue(selected)) : ''}
          onValueChange={handleChange}
          disabled={disabled}
          name={name}
        >
          <RadixSelect.Trigger
            data-kbs-ignore
            className={clsx(
              'relative w-full cursor-default rounded-md text-left shadow-xs',
              inputOutline,
              buttonSizes[size],
              listBoxAndButtonSizes[size],
              getInputBackground(disabled),
              getInputColor(error, false),
              { 'mt-1': (label && !hiddenLabel) || corner },
            )}
            id={finalId}
          >
            <RadixSelect.Value
              placeholder={
                <span
                  className={error ? 'text-danger-300' : 'text-neutral-400'}
                >
                  {placeholder}&nbsp;
                </span>
              }
            >
              {selected
                ? finalRenderSelectedOption(selected)
                : // non-blocking space so even empty selected is displayed correctly
                  '\u00A0'}
            </RadixSelect.Value>

            {!disabled && clearable && selected && (
              <div
                className="absolute inset-y-0 right-6 mr-2 flex cursor-pointer items-center"
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                onPointerUp={() => {
                  onChange(undefined);
                }}
              >
                <XMarkIcon className="size-4 text-neutral-400 hover:text-neutral-500" />
              </div>
            )}

            <RadixSelectIcon />
          </RadixSelect.Trigger>
          <Portal>
            <RadixSelect.Content
              align={listBoxPlacement}
              position="popper"
              sideOffset={5}
              className={clsx(
                'my-1 max-h-52 rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm',
                !fluidListBox && 'w-(--radix-select-trigger-width)',
              )}
            >
              <RadixSelect.Viewport>
                <div className="max-h-52 overflow-y-auto">
                  {options.length === 0 && (
                    <div
                      className={clsx(
                        'relative cursor-default pr-4 pl-8 select-none',
                        listBoxAndButtonSizes,
                      )}
                    >
                      <span className="block truncate font-normal text-neutral-500">
                        {emptyHint}
                      </span>
                    </div>
                  )}
                  {options.map((option) => {
                    const value = getValue(option);
                    return (
                      <RadixSelect.Item
                        data-kbs-ignore
                        value={String(value)}
                        key={value}
                        className={clsx(
                          'group relative flex cursor-default flex-row items-center pr-4 pl-8 outline-hidden select-none',
                          listBoxAndButtonSizes[size],
                          highlightClassName,
                        )}
                      >
                        <RadixSelect.ItemText className="block flex-1 truncate font-normal">
                          <span className="group-data-[state=checked]:font-semibold">
                            {renderOption(option)}
                          </span>
                        </RadixSelect.ItemText>

                        <RadixSelect.ItemIndicator className="absolute inset-y-0 left-0 inline-flex w-[25px] items-center justify-center pl-1.5">
                          <CheckIcon className="size-5 text-primary-600 group-data-highlighted:text-white" />
                        </RadixSelect.ItemIndicator>
                      </RadixSelect.Item>
                    );
                  })}
                </div>
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </Portal>
        </RadixSelect.Root>

        <Help noMargin error={error} help={help} className="mt-1" />
      </div>
    </div>
  );
}

function RadixSelectIcon() {
  return (
    <RadixSelect.Icon className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
      <svg
        className="size-5 text-neutral-400"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </RadixSelect.Icon>
  );
}
