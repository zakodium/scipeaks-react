import classNames from 'classnames';
import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface ITextAreaProps extends TextAreaProps {
  label?: string;
  description?: string;
  error?: string;
}

const error =
  'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red';

export function TextArea(props: ITextAreaProps): JSX.Element {
  return (
    <div className="mt-1 sm:mt-0 sm:col-span-2">
      {props.label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          {props.label}
        </label>
      )}
      <div className="flex max-w-lg mt-1 rounded-md shadow-sm">
        <textarea
          {...props}
          className={classNames(
            'block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5',
            {
              [error]: props.error,
            },
          )}
        />
      </div>

      {(props.error || props.description) && (
        <p
          className={classNames('mt-2 text-sm text-gray-500', {
            'text-red-600': props.error,
          })}
        >
          {props.error || props.description}
        </p>
      )}
    </div>
  );
}
