/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React, { ReactNode, Ref, Fragment } from 'react';

export interface IDropdownOption<T> {
  icon?: ReactNode;
  label: string;
  component?: ReactNode;
  data?: T;
}

export interface IDropdownProps<T> {
  children?: ReactNode;
  title?: string;
  options: Array<IDropdownOption<T>>;
  onSelect: (selected: IDropdownOption<T>) => void;
  onClick: () => void;
  open: boolean;
  buttonRef: Ref<HTMLButtonElement>;
}

export function Dropdown<T>(props: IDropdownProps<T>): React.ReactElement {
  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          {!props.children && (
            <button
              ref={props.buttonRef}
              onClick={props.onClick}
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            >
              {props.title}
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {props.children && (
            <button
              ref={props.buttonRef}
              onClick={props.onClick}
              className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Options"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              type="button"
            >
              {props.children}
            </button>
          )}
        </span>
      </div>

      <div
        className={classNames(
          'absolute right-0 w-56 mt-2 origin-top-right rounded-md shadow-lg',
          {
            hidden: !props.open,
          },
        )}
      >
        <div className="bg-white rounded-md shadow-xs">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {props.options.map((option, index) => (
              <Fragment key={index}>
                {option.component !== undefined && option.component}
                {option.component === undefined && (
                  <span
                    onClick={() => props.onSelect(option)}
                    className={classNames(
                      'block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer',
                      {
                        'group flex items-center': option.icon,
                        block: !option.icon,
                      },
                    )}
                  >
                    {option.icon !== undefined && option.icon}
                    {option.label}
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
