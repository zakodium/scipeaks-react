import classNames from 'classnames';
import React, { ReactNode } from 'react';

type InputProps = React.ButtonHTMLAttributes<HTMLInputElement>;

export interface IInputProps extends InputProps {
  id: string;
  label: string;
  hiddenLabel?: boolean;
  optional?: boolean;
  error?: string;
  help?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

const error =
  'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red';

export function Input(props: IInputProps): JSX.Element {
  const { hiddenLabel = false, optional = false } = props;

  return (
    <div>
      <div className="flex justify-between">
        <label
          htmlFor={props.id}
          className={classNames(
            'block text-sm font-medium leading-5 text-gray-700',
            {
              'sr-only': hiddenLabel,
            },
          )}
        >
          {props.label}
        </label>
        {optional && <OptionalComponent />}
      </div>

      <div className="relative mt-1 rounded-md shadow-sm">
        {props.leading && <LeadingComponent {...props} />}
        <input
          id={props.id}
          className={classNames(
            'block w-full form-input sm:text-sm sm:leading-5',
            {
              [error]: props.error,
              'pl-10': props.leading,
            },
          )}
          placeholder={props.placeholder}
        />
        {props.trailing && <TrailingComponent {...props} />}
        {props.error && <ErrorComponent />}
      </div>
      {(props.error || props.help) && (
        <p
          className={classNames('mt-2 text-sm text-gray-500', {
            'text-red-600': props.error,
          })}
        >
          {props.error || props.help}
        </p>
      )}
    </div>
  );
}

function TrailingComponent(props: IInputProps): JSX.Element {
  return (
    <div
      className={classNames(
        'absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none',
        {
          'mr-5': props.error,
        },
      )}
    >
      <span className="text-gray-500 sm:text-sm sm:leading-5">
        {props.trailing}
      </span>
    </div>
  );
}

function LeadingComponent(props: IInputProps): JSX.Element {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      {props.leading}
    </div>
  );
}

function OptionalComponent(): JSX.Element {
  return <span className="text-sm leading-5 text-gray-500">Optional</span>;
}

function ErrorComponent(): JSX.Element {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg
        className="w-5 h-5 text-red-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
