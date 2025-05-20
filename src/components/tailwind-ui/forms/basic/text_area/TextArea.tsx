import clsx from 'clsx';
import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import { useInputId } from '../../../hooks/useInputId';
import type { HelpPublicProps } from '../common';
import { Help, InputCorner, Label } from '../common';
import {
  getInputBackground,
  getInputColor,
  inputOutline,
  inputText,
} from '../utils.common';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HelpPublicProps {
  name: string;
  label: ReactNode;
  hiddenLabel?: boolean;
  textAreaClassName?: string;
  /**
   * Custom react node to display in the upper right corner of the input
   */
  corner?: ReactNode;
}

export const TextArea = forwardRef(function TextAreaForwardRef(
  props: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  const {
    name,
    id,
    className,
    help,
    error,
    valid,
    label,
    disabled,
    hiddenLabel = false,
    corner,
    textAreaClassName,
    rows = 5,
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
          disabled={disabled}
        />
        <InputCorner>{corner}</InputCorner>
      </div>
      <div
        className={clsx('flex', {
          'mt-1': !hiddenLabel || corner,
        })}
      >
        <textarea
          ref={ref}
          id={finalId}
          name={name}
          className={clsx(
            'block w-full rounded-md px-3 py-2 shadow-xs',
            inputText,
            inputOutline,
            getInputBackground(disabled),
            getInputColor(error, valid),
            textAreaClassName,
          )}
          rows={rows}
          disabled={disabled}
          {...otherProps}
        />
      </div>
      <Help help={help} error={error} valid={valid} />
    </div>
  );
});
