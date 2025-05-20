import * as RadixDropdown from '@radix-ui/react-dropdown-menu';

import type { DropdownAsChildProps, DropdownBaseProps } from './Dropdown';

export function DropdownTriggerAsChild<T>(
  props: Omit<DropdownAsChildProps<T>, keyof DropdownBaseProps<T>> & {
    disabled?: boolean;
  },
) {
  const { disabled, children } = props;

  return (
    <RadixDropdown.Trigger disabled={disabled} asChild>
      {children}
    </RadixDropdown.Trigger>
  );
}
