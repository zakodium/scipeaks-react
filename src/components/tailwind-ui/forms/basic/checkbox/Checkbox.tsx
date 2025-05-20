import clsx from 'clsx';
import type { ReactNode, Ref } from 'react';
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';

import { useInputId } from '../../../hooks/useInputId';
import type { HelpPublicProps } from '../common';
import { Help } from '../common';
import { labelColor, labelDisabledColor } from '../utils.common';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  label?: ReactNode;
  help?: HelpPublicProps['help'];
  error?: HelpPublicProps['error'];
  indeterminate?: boolean;
}

export const Checkbox = forwardRef(function CheckboxForwardRef(
  props: CheckboxProps,
  ref: Ref<HTMLInputElement | null>,
) {
  const {
    name,
    value,
    id,
    label,
    help,
    error,
    className,
    indeterminate,
    ...otherProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current);
  useLayoutEffect(() => {
    if (inputRef.current && indeterminate !== undefined) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const finalId = useInputId(id, `${name}-${String(value)}`);

  return (
    <div className={clsx('flex items-start', className)}>
      <div className="flex h-5 shrink-0 items-center">
        <div className="group grid size-4 grid-cols-1">
          <input
            {...otherProps}
            id={finalId}
            name={name}
            value={value}
            type="checkbox"
            ref={inputRef}
            className={clsx(
              'col-start-1 row-start-1 appearance-none rounded-sm border bg-white checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:border-neutral-300 disabled:bg-neutral-100 disabled:checked:bg-neutral-100 forced-colors:appearance-auto',
              error
                ? 'border-danger-300 focus-visible:outline-danger-600'
                : 'border-neutral-300 focus-visible:outline-primary-600',
            )}
          />
          <svg
            fill="none"
            viewBox="0 0 14 14"
            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-neutral-950/25"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-checked:opacity-100"
            />
            <path
              d="M3 7H11"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-indeterminate:opacity-100"
            />
          </svg>
        </div>
      </div>

      <div className="ml-3 text-sm">
        {label && (
          <label
            htmlFor={finalId}
            className={clsx(
              'font-semibold',
              props.disabled ? labelDisabledColor : labelColor,
            )}
          >
            {label}
          </label>
        )}
        <Help help={help} error={error} noMargin />
      </div>
    </div>
  );
});
