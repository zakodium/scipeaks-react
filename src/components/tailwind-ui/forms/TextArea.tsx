import React from 'react';

type TextAreaProps = React.ButtonHTMLAttributes<HTMLTextAreaElement>;

export interface ITextAreaProps extends TextAreaProps {
  label?: string;
  description?: string;
}

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
          className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"
        />
      </div>
      {props.description && (
        <p className="mt-2 text-sm text-gray-500">{props.description}</p>
      )}
    </div>
  );
}
