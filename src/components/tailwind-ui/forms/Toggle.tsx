import classNames from 'classnames';
import React, { ReactNode } from 'react';

export interface IToggleProps {
  activated: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onToggle: (activated: boolean) => void;
  name?: string;
  label?: string;
}

export function Toggle(props: IToggleProps): JSX.Element {
  const { activated, onToggle, children, ...otherProps } = props;

  function handleChange(): void {
    onToggle(!activated);
  }

  return (
    <>
      <label>
        <div className="flex justify-between">
          <div className="block mb-1 text-sm font-medium leading-5 text-gray-700">
            {props.label && props.label}
          </div>
        </div>

        <input
          name={props.name}
          className="hidden"
          type="checkbox"
          {...otherProps}
          onChange={handleChange}
        />
        <span
          tabIndex={0}
          className={classNames(
            'relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full w-11 ',
            {
              'bg-gray-200 focus:outline-none focus:shadow-outline cursor-pointer':
                !props.activated && !props.disabled,
              'bg-indigo-600 focus:outline-none focus:shadow-outline cursor-pointer':
                props.activated && !props.disabled,
              'cursor-default bg-gray-100': props.disabled && !props.activated,
              'cursor-default bg-indigo-300': props.disabled && props.activated,
            },
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              'inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow',
              {
                'translate-x-0': !props.activated,
                'translate-x-5': props.activated,
              },
            )}
          >
            {props.children && (
              <>
                <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-200 ease-in opacity-100">
                  <span className="w-3 h-3 text-gray-400">
                    {props.children}
                  </span>
                </span>
                <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-100 ease-out opacity-0">
                  <span className="w-3 h-3 text-indigo-600">
                    {props.children}
                  </span>
                </span>
              </>
            )}
          </span>
        </span>
      </label>
    </>
  );
}
