import classNames from 'classnames';
import React from 'react';

type RadioProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface IRadioProps extends RadioProps {
  id: string;
  label: string;
  name: string;
}

export function Radio(props: IRadioProps): JSX.Element {
  return (
    <div className="flex items-center mt-4">
      <input
        {...props}
        id={props.id}
        name={props.name}
        type="radio"
        className={classNames(
          'w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio',
          {
            'cursor-default': props.disabled,
            'cursor-pointer': !props.disabled,
          },
        )}
      />
      <label htmlFor={props.id} className="ml-3">
        <span
          className={classNames('block text-sm font-medium leading-5', {
            'text-gray-300': props.disabled,
            'text-gray-700': !props.disabled,
          })}
        >
          {props.label}
        </span>
      </label>
    </div>
  );
}
