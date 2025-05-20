import clsx from 'clsx';
import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import { Spinner } from '../../../elements/spinner/Spinner';
import { useInputId } from '../../../hooks/useInputId';
import type { HelpPublicProps } from '../common';
import {
  Help,
  InputCorner,
  InputErrorIcon,
  InputValidIcon,
  Label,
} from '../common';
import {
  getInputBackground,
  getInputColor,
  getInputPlaceholder,
  inputOutline,
  inputText,
} from '../utils.common';

export interface CustomInputProps extends HelpPublicProps {
  leadingAddon?: ReactNode;
  leadingInlineAddon?: ReactNode;
  trailingAddon?: ReactNode;
  trailingInlineAddon?: ReactNode;
  loading?: boolean;
  label: ReactNode;
  hiddenLabel?: boolean;
  inlinePlaceholder?: ReactNode;
  inputClassName?: string;
  /**
   * Custom react node to display in the upper right corner of the input
   */
  corner?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    CustomInputProps {
  /**
   * Ref for the <div> wrapping the <input> element.
   */
  wrapperRef?: Ref<HTMLDivElement>;
}

export const Input = forwardRef(function InputForwardRef(
  props: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  const {
    name,
    id,
    className,
    style,
    help,
    error,
    valid,
    leadingAddon,
    leadingInlineAddon,
    trailingAddon,
    trailingInlineAddon,
    loading,
    label,
    corner,
    hiddenLabel = false,
    placeholder,
    inlinePlaceholder,
    wrapperRef,
    type = 'text',
    inputClassName,
    ...otherProps
  } = props;

  const finalId = useInputId(id, name);

  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-2">
        <Label
          id={finalId}
          text={label}
          hidden={hiddenLabel}
          required={props.required}
          disabled={props.disabled}
        />
        <InputCorner>{corner}</InputCorner>
      </div>

      <div
        ref={wrapperRef}
        className={clsx('flex rounded-md shadow-xs', {
          'mt-1': !hiddenLabel || corner,
        })}
      >
        {leadingAddon && <LeadingAddon value={leadingAddon} />}
        <label
          htmlFor={finalId}
          className={clsx(
            'px-3 py-2',
            'relative flex flex-1 flex-row items-center',
            inputText,
            inputOutline,
            getInputBackground(props.disabled),
            getInputColor(error, valid),
            {
              'rounded-r-md': leadingAddon && !trailingAddon,
              'rounded-l-md': trailingAddon && !leadingAddon,
              'rounded-md': !leadingAddon && !trailingAddon,
            },
          )}
          style={style}
        >
          {leadingInlineAddon && (
            <LeadingInlineAddon value={leadingInlineAddon} />
          )}
          <div className="relative flex flex-1 flex-row">
            {inlinePlaceholder && (
              <div className="pointer-events-none absolute inset-0 w-full truncate overflow-hidden">
                {inlinePlaceholder}
              </div>
            )}
            <input
              ref={ref}
              id={finalId}
              name={name}
              placeholder={
                placeholder && !inlinePlaceholder ? placeholder : undefined
              }
              className={clsx(
                'flex-1 p-0 focus:outline-hidden',
                getInputColor(error, valid),
                getInputPlaceholder(error, valid),
                inputClassName,
              )}
              type={type}
              {...otherProps}
            />
          </div>
          <div className="inline-flex cursor-default flex-row items-center space-x-1">
            {loading && <Spinner className="size-5 text-neutral-400" />}
            {trailingInlineAddon && (
              <TrailingInlineAddon value={trailingInlineAddon} />
            )}
          </div>
          {error && <InputErrorIcon />}
          {valid && <InputValidIcon />}
        </label>
        {trailingAddon && <TrailingAddon value={trailingAddon} />}
      </div>
      <Help error={error} valid={valid} help={help} />
    </div>
  );
});

function LeadingInlineAddon(props: { value: ReactNode }) {
  return (
    <div className="flex items-center pr-2 text-neutral-500 sm:text-sm">
      {props.value}
    </div>
  );
}

function TrailingInlineAddon(props: { value: ReactNode }) {
  return (
    <div className={clsx('flex items-center pl-2 text-neutral-500 sm:text-sm')}>
      {props.value}
    </div>
  );
}

function LeadingAddon(props: { value: ReactNode }) {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-500 sm:text-sm',
        typeof props.value === 'string' && 'px-3',
      )}
    >
      {props.value}
    </div>
  );
}

function TrailingAddon(props: { value: ReactNode }) {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-r-md border border-l-0 border-neutral-300 bg-neutral-50 text-neutral-500 sm:text-sm',
        typeof props.value === 'string' && 'px-3',
      )}
    >
      {props.value}
    </div>
  );
}
