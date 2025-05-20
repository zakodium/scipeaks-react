import { XMarkIcon } from '@heroicons/react/24/outline';
import type { ElementType, ReactNode } from 'react';

import type { PropsOf } from '../../../types';

export interface BannerProps<T extends ElementType> {
  description: ReactNode;
  linkAs?: T;
  linkAsProps?: PropsOf<T>;
  linkText: string;
  onDismiss?: () => void;
  icon: ReactNode;
}

export function Banner<T extends ElementType = 'a'>(props: BannerProps<T>) {
  const {
    linkAs,
    linkAsProps,
    linkText: buttonText,
    onDismiss,
    description,
    icon,
  } = props;

  const Component: ElementType = linkAs || 'a';

  return (
    <div className="bg-primary-700">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-start text-white md:items-center">
            <span className="flex rounded-lg bg-primary-800 p-2">
              <span className="size-6">{icon}</span>
            </span>
            <div className="ml-3 font-semibold">
              <span className="md:inline">{description}</span>
            </div>
          </div>
          <div className="order-3 mt-2 w-full shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <Component
              {...linkAsProps}
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-semibold text-primary-600 shadow-xs hover:bg-primary-50"
            >
              {buttonText}
            </Component>
          </div>
          {onDismiss && (
            <div className="order-2 shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                onClick={onDismiss}
                className="-mr-1 flex rounded-md p-2 hover:bg-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden sm:-mr-2"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="size-6 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
