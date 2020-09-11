import classNames from 'classnames';
import React from 'react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface ICheckboxProps extends CheckboxProps {
  id: string;
  label: string;
  helpMessage: string;
}

export function Checkbox(props: ICheckboxProps): JSX.Element {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          {...props}
          id={props.id}
          type="checkbox"
          className={classNames(
            'w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox',
            props.disabled ? 'cursor-default' : 'cursor-pointer',
          )}
        />
      </div>
      <div className="ml-3 text-sm leading-5">
        <label
          htmlFor={props.id}
          className={classNames('font-medium', {
            'text-gray-700': !props.disabled,
            'text-gray-300': props.disabled,
          })}
        >
          {props.label}
        </label>
        <p
          className={classNames({
            'text-gray-500': !props.disabled,
            'text-gray-300': props.disabled,
          })}
        >
          {props.helpMessage}
        </p>
      </div>
    </div>
  );
}
