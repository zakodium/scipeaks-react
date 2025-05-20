import * as RadixSwitch from '@radix-ui/react-switch';
import clsx from 'clsx';

import { useInputId } from '../../../hooks/useInputId';
import type { HelpPublicProps } from '../common';
import { Help } from '../common';
import { labelColor, labelDisabledColor } from '../utils.common';

export interface ToggleProps {
  label: string;
  activated: boolean;
  onChange: (activated: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: ToggleSize;
  id?: string;
  name?: string;
  error?: HelpPublicProps['error'];
}

export type ToggleSize = 'Small' | 'Large';

const switchFocus =
  'focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500';

export function Toggle(props: ToggleProps) {
  const {
    error,
    size = 'Small',
    label,
    disabled,
    activated,
    onChange,
    id,
    name,
    className,
  } = props;

  const finalId = useInputId(id, name);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-5">
        <RadixSwitch.Root
          checked={activated}
          disabled={disabled}
          onCheckedChange={onChange}
          id={finalId}
          name={name}
          className={clsx(
            'relative flex shrink-0 items-center rounded-full outline-hidden disabled:bg-neutral-100',
            size === 'Large'
              ? 'h-6 w-11 border-2 border-transparent'
              : 'h-4 w-10',
            className,
            disabled ? 'cursor-default' : 'cursor-pointer',
            activated && !error ? 'bg-primary-600' : 'bg-neutral-200',
            switchFocus,
          )}
        >
          <RadixSwitch.Thumb
            className={clsx(
              'block size-5 translate-x-0 rounded-full shadow-sm ring-0 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-5',
              error ? 'bg-danger-600' : 'bg-white',
            )}
          />
        </RadixSwitch.Root>
        <label
          htmlFor={finalId}
          className={clsx(
            'text-sm font-semibold',
            disabled ? labelDisabledColor : labelColor,
          )}
        >
          {label}
        </label>
      </div>
      {error && <Help error={error} />}
    </div>
  );
}
