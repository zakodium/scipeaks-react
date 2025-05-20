import { ChevronRightIcon } from '@heroicons/react/24/outline';
import type { ElementType, ReactNode } from 'react';
import { Fragment } from 'react';

import type { PropsOf } from '../../types';

export interface StackedListProps {
  children: ReactNode;
}

export function StackedList(props: StackedListProps) {
  return (
    <div className="bg-white shadow-sm sm:rounded-md">
      <ul>{props.children}</ul>
    </div>
  );
}

type StackedListRowProps<T> = {
  as?: T;
  children: [ReactNode, ReactNode];
} & PropsOf<T>;

export function StackedListRow<T extends ElementType = typeof Fragment>(
  props: StackedListRowProps<T>,
) {
  const { as: Element = Fragment, children, ...otherProps } = props;

  return (
    <li className="block transition duration-150 ease-in-out hover:bg-neutral-50">
      <Element {...otherProps}>
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              {children}
            </div>
          </div>
          <div>
            <ChevronRightIcon className="size-5 text-neutral-400" />
          </div>
        </div>
      </Element>
    </li>
  );
}

/**
 * @deprecated Use StackedListRow instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
StackedList.Row = StackedListRow;
