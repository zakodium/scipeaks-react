/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React, { ReactNode } from 'react';

export interface IVerticalNavigationOptions<T = string> {
  value: T;
  label?: ReactNode;
}

export interface IVerticalNavigationProps<T> {
  options: Array<IVerticalNavigationOptions<T>>;
  selected: IVerticalNavigationOptions<T> | undefined;
  onSelect(
    selected: IVerticalNavigationOptions<T>,
    options: Array<IVerticalNavigationOptions<T>>,
  ): void;
}

const activated =
  'text-gray-900 bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-200';
const notActivated =
  'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:text-gray-900 focus:bg-gray-50';

export function VerticalNavigation<T>(
  props: IVerticalNavigationProps<T>,
): JSX.Element {
  const opts = props.options.map((element) => {
    return {
      ...element,
      label: element.label || element.value,
    };
  });

  return (
    <nav>
      {opts.map((element, index) => {
        return (
          <Navigation
            key={index}
            callback={() => props.onSelect(element, opts)}
            element={element}
            selected={props.selected}
          />
        );
      })}
    </nav>
  );
}

interface INavigationProps<T> {
  element: IVerticalNavigationOptions<T>;
  selected: IVerticalNavigationOptions<T> | undefined;
  callback: () => void;
}

function Navigation<T>(props: INavigationProps<T>): JSX.Element {
  return (
    <span
      onClick={props.callback}
      className={classNames(
        'flex items-center px-3 py-2 text-sm font-medium leading-5 truncate transition duration-150 ease-in-out rounded-md group focus:outline-none cursor-pointer',
        notActivated,
        {
          [activated]:
            props.selected !== undefined &&
            props.element.value === props.selected.value,
        },
      )}
    >
      {props.element.label}
    </span>
  );
}
