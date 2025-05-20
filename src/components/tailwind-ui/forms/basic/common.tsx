import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import { labelColor, labelDisabledColor } from './utils.common';

export interface LabelProps {
  id?: string;
  labelId?: string;
  text: ReactNode;
  hidden?: boolean;
  required?: boolean;
  disabled?: boolean;
  // used to focus non-labealable items (like, contentEditable div)
  onClick?: () => void;
  className?: string;
}

export const Label = forwardRef(function LabelForwardRef(
  props: LabelProps,
  ref: Ref<HTMLLabelElement>,
) {
  const {
    labelId,
    id,
    className,
    text,
    disabled,
    hidden,
    required,
    ...otherProps
  } = props;
  return (
    <label
      ref={ref}
      id={labelId}
      htmlFor={id}
      className={clsx(
        'block text-sm font-semibold',
        disabled ? labelDisabledColor : labelColor,
        hidden && 'sr-only',
        className,
      )}
      {...otherProps}
    >
      {text}
      {required && <span className="text-warning-600"> *</span>}
    </label>
  );
});

const helpColorMap = {
  error: 'text-danger-600',
  valid: 'text-success-700',
  help: 'text-neutral-500',
};

interface HelpProps {
  error?: boolean | string;
  valid?: string | boolean;
  help?: string;
  noMargin?: boolean;
  className?: string;
}

export type HelpPublicProps = Pick<HelpProps, 'error' | 'valid' | 'help'>;

export function Help(props: HelpProps) {
  const { error, valid, help, noMargin, className } = props;
  if (!error && !(typeof valid === 'string') && !help) {
    return null;
  }

  const toDisplay =
    typeof error === 'string'
      ? ({ type: 'error', value: error } as const)
      : typeof valid === 'string'
        ? ({ type: 'valid', value: valid } as const)
        : ({ type: 'help', value: help } as const);

  return (
    <p
      className={clsx(
        'text-sm whitespace-pre-line',
        helpColorMap[toDisplay.type],
        !noMargin && 'mt-2',
        className,
      )}
    >
      {toDisplay.value}
    </p>
  );
}

export function InputCorner(props: { children: ReactNode }) {
  return <div className="text-sm">{props.children}</div>;
}

export function InputErrorIcon() {
  return <ExclamationCircleIcon className="ml-2 size-5 text-danger-500" />;
}

export function InputValidIcon() {
  return <CheckIcon className="ml-2 size-5 text-success-600" />;
}
