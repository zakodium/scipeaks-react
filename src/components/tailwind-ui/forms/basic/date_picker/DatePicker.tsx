import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { ReactDatePickerProps } from 'react-datepicker';
import ReactDatePicker from 'react-datepicker';

import { useInputId } from '../../../hooks/useInputId';
import type { HelpPublicProps } from '../common';
import { InputCorner, Label } from '../common';
import { Input } from '../input/Input';

if (typeof window !== 'undefined') {
  // @ts-ignore
  void import('react-datepicker/dist/react-datepicker.css');
}

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'name' | 'required'
>;

export type DatePickerProps = Omit<
  ReactDatePickerProps<false>,
  | 'selected'
  | 'wrapperClassName'
  | 'selectsRange'
  | 'customInput'
  | 'value'
  | 'showPopperArrow'
  | 'popperPlacement'
> & {
  value: Date | null;

  name: string;
  label: ReactNode;
  hiddenLabel?: boolean;
  corner?: ReactNode;

  inputRef?: Ref<HTMLInputElement>;
  inputProps?: InputProps;
} & HelpPublicProps;

export function DatePicker(props: DatePickerProps) {
  const {
    value,
    onChange,

    name,
    label,
    help,
    error,
    valid,
    hiddenLabel,
    corner,

    inputRef,
    inputProps,

    id,
    isClearable,
    className,
    ...otherProps
  } = props;

  const finalId = useInputId(id, name);

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-2">
        <Label
          id={finalId}
          text={label}
          hidden={hiddenLabel}
          required={props.required}
          disabled={props.disabled}
        />
        <InputCorner>{corner}</InputCorner>
      </div>
      <ReactDatePicker
        id={finalId}
        name={name}
        selected={value}
        wrapperClassName={clsx('min-w-[11ch] w-full flex relative', {
          'mt-1': !hiddenLabel || corner,
        })}
        // We do not allow ranges because the callback would not receive a Date
        selectsRange={false}
        customInput={
          <DatePickerInput
            id={finalId}
            name={name}
            help={help}
            error={error}
            valid={valid}
            inputRef={inputRef}
            inputProps={inputProps}
            isClearable={isClearable}
            selected={value}
            onSelectChange={onChange}
          />
        }
        onChange={onChange}
        popperPlacement="bottom-start"
        // Arrow is broken and won't work if set
        showPopperArrow={false}
        {...otherProps}
      />
    </div>
  );
}

interface DatePickerInputProps {
  id: string;
  name: string;
  help?: HelpPublicProps['help'];
  error?: HelpPublicProps['error'];
  valid?: HelpPublicProps['valid'];
  inputRef?: Ref<HTMLInputElement>;
  inputProps?: InputProps;
  isClearable?: boolean;
  selected: DatePickerProps['value'];
  onSelectChange: DatePickerProps['onChange'];
}

const DatePickerInput = forwardRef(function DatePickerInput(
  {
    inputRef,
    inputProps = {},
    id,
    name,
    selected,
    isClearable,
    onSelectChange,
    // Other props to control the input (such as id, value) are passed by react-datepicker
    ...otherProps
  }: DatePickerInputProps,
  ref: Ref<HTMLInputElement>,
) {
  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);
  useImperativeHandle(inputRef, () => innerRef.current as HTMLInputElement);
  const { size = 1, className, ...otherInputProps } = inputProps;
  return (
    <Input
      {...otherProps}
      {...otherInputProps}
      // Label is already on the DatePicker
      label={null}
      hiddenLabel
      id={id}
      name={name}
      autoComplete="off"
      ref={innerRef}
      size={size}
      inputClassName={className}
      trailingInlineAddon={
        selected && isClearable ? (
          <XMarkIcon
            className="size-3.5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onSelectChange?.(null, e);
            }}
          />
        ) : undefined
      }
    />
  );
});
