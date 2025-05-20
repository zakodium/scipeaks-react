import clsx from 'clsx';
import type { InputHTMLAttributes, ReactElement, Ref } from 'react';
import { Children, cloneElement, forwardRef } from 'react';

import { useInputId } from '../../../hooks/useInputId';
import { Label } from '../common';
import type { GroupOptionProps } from '../group_option/GroupOption';
import { Radio } from '../radio/Radio';

export interface OptionProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  name: string;
  label: string;
  id?: string;
  description?: string;
  value: string;
}

export const Option = forwardRef(function OptionForwardRef(
  props: OptionProps,
  ref: Ref<HTMLInputElement>,
) {
  const { name, label, id, description, value, checked, ...otherProps } = props;

  const finalId = useInputId(id, `${name}_${value}`);

  return (
    <label htmlFor={finalId}>
      <div
        className={clsx(
          'group flex p-4 has-[div>input:checked]:z-10 has-[div>input:checked]:border-primary-200 has-[div>input:checked]:bg-primary-50',
          otherProps.disabled ? 'cursor-default' : 'cursor-pointer',
        )}
      >
        <Radio
          name={name}
          ref={ref}
          id={finalId}
          checked={checked}
          {...otherProps}
          value={value}
          label={
            <>
              <span className="block text-sm font-semibold text-neutral-900 group-has-[div>input:checked]:text-primary-900 group-has-[div>input:disabled]:text-neutral-500">
                {label}
              </span>
              {description && (
                <span className="block text-sm text-neutral-500 group-has-[div>input:checked]:text-primary-700">
                  {description}
                </span>
              )}
            </>
          }
        />
      </div>
    </label>
  );
});

export function GroupOptionInternal(props: GroupOptionProps): ReactElement {
  const lastChildIndex = Children.count(props.children) - 1;

  return (
    <div>
      {props.label && (
        <Label
          text={props.label}
          disabled={props.disabled}
          required={props.required}
          hidden={props.hiddenLabel}
        />
      )}
      <div
        className={clsx(
          'has-focus-visible:rounded-md has-focus-visible:ring-2 has-focus-visible:ring-primary-600 has-focus-visible:ring-offset-2',
          {
            'mt-1': !props.hiddenLabel,
          },
        )}
      >
        {Children.map(props.children, (child, index) => {
          return (
            <div
              key={child.props.id}
              className={clsx('border border-neutral-200', {
                'rounded-tl-md rounded-tr-md': index === 0,
                'border-b-0': index !== lastChildIndex,
                'rounded-br rounded-bl-md border-b': index === lastChildIndex,
              })}
            >
              {props.disabled === true
                ? cloneElement(child, {
                    disabled: props.disabled,
                    name: props.name,
                  })
                : child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
