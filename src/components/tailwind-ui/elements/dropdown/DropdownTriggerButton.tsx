import { ChevronDownIcon } from '@heroicons/react/20/solid';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import type { DropdownAsButtonProps, DropdownBaseProps } from './Dropdown';

const titleClassName =
  'inline-flex justify-center w-full rounded-md ring-1 ring-inset ring-neutral-300 shadow-xs px-4 py-2 bg-white text-sm font-semibold text-neutral-700 hover:enabled:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';
const iconClassName =
  'rounded-full flex items-center text-neutral-400 hover:enabled:text-neutral-600 focus:outline-hidden focus:ring-2 focus:ring-primary-500';

export function DropdownTriggerButton<T>(
  props: Omit<DropdownAsButtonProps<T>, keyof DropdownBaseProps<T>> & {
    disabled?: boolean;
  },
) {
  const {
    buttonTabIndex,
    disabled,
    noDefaultButtonStyle,
    buttonClassName,
    children,
    title,
    size = 'medium',
  } = props;

  return (
    <RadixDropdown.Trigger
      tabIndex={buttonTabIndex}
      disabled={disabled}
      className={
        noDefaultButtonStyle
          ? buttonClassName
          : clsx(children ? iconClassName : titleClassName, buttonClassName)
      }
    >
      {children || (
        <div className="flex items-center">
          {title || (
            // element with a line height but no width
            <span className="w-0 whitespace-pre-wrap"> </span>
          )}
          <ChevronDownIcon
            className={clsx(
              {
                'size-4': size === 'xSmall',
                'size-5': size === 'small' || size === 'medium',
                'size-6': size === 'large' || size === 'xLarge',
              },
              title ? '-mr-1 ml-2' : '-mx-2',
            )}
          />
        </div>
      )}
    </RadixDropdown.Trigger>
  );
}
