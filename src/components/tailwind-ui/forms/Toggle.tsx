import classNames from 'classnames';
import React, { ReactNode } from 'react';

export interface IToggleProps {
  activated: boolean;
  children?: ReactNode;
  onClick: () => void;
}

export function Toggle(props: IToggleProps): JSX.Element {
  return (
    <span
      onClick={props.onClick}
      role="checkbox"
      tabIndex={0}
      aria-checked="false"
      className={classNames(
        'relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline',
        {
          'bg-gray-200': !props.activated,
          'bg-indigo-600': props.activated,
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
              <span className="w-3 h-3 text-gray-400">{props.children}</span>
            </span>
            <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity duration-100 ease-out opacity-0">
              <span className="w-3 h-3 text-indigo-600">{props.children}</span>
            </span>
          </>
        )}
      </span>
    </span>
  );
}
