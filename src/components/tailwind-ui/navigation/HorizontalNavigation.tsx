/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React, { ReactNode } from 'react';

export interface IHorizontalNavigationOptions<T = string> {
  value: T;
  label?: ReactNode;
}

export interface IHorizontalNavigationProps<T> {
  options: IHorizontalNavigationOptions<T>[];
  selected: IHorizontalNavigationOptions<T> | undefined;
  onSelect: (
    clicked: IHorizontalNavigationOptions<T>,
    options: IHorizontalNavigationOptions<T>[],
  ) => void;
}

const activated =
  'text-indigo-600 border-indigo-500 hover:border-indigo-500 focus:text-indigo-800 focus:border-indigo-700';
const notActivated =
  'text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300';

export function HorizontalNavigation<T>({
  options,
  selected,
  onSelect,
}: IHorizontalNavigationProps<T>): JSX.Element {
  const opts = options.map((element) => {
    return {
      ...element,
      label: element.label || element.value,
    };
  });

  return (
    <div>
      <div className="sm:hidden">
        <select
          aria-label="Selected tab"
          onChange={(event) => onSelect(opts[event.target.selectedIndex], opts)}
          className="block w-full py-2 pl-3 pr-10 mt-1 text-base leading-6 transition duration-150 ease-in-out form-select focus:outline-none focus:shadow-outline-blue sm:text-sm sm:leading-5"
        >
          {opts.map((element, index) => (
            <option key={index}>{element.label}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {opts.map((element, index) => (
              <span
                onClick={() => onSelect(element, opts)}
                key={index}
                className={classNames(
                  'px-1 py-4 text-sm font-medium leading-5 whitespace-no-wrap border-b-2 border-transparent focus:outline-none cursor-pointer',
                  notActivated,
                  {
                    'ml-8': index !== 0,
                    [activated]:
                      selected !== undefined &&
                      element.value === selected.value,
                  },
                )}
              >
                {element.label}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
