import clsx from 'clsx';
import type { ElementType, ReactElement, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { Color, Roundness, Size, Variant } from '../../../types';
import type { DropdownAsButtonProps } from '../../dropdown/Dropdown';
import { Dropdown } from '../../dropdown/Dropdown';
import type { ButtonProps } from '../button/Button';
import { Button } from '../button/Button';
import { getButtonClassName } from '../utils';

interface ButtonGroupContext {
  variant: Variant;
  color: Color;
  size: Size;
  roundness: 'full' | 'light';
  disabled: boolean;
}

const context = createContext<ButtonGroupContext | null>(null);

export interface ButtonGroupProps {
  variant?: Variant;
  color?: Color;
  children: ReactNode;
  size?: Size;
  roundness?: 'full' | 'light';
  disabled?: boolean;
}

function getButtonGroupRoundness(roundness: Roundness) {
  return roundness === 'full' || roundness === 'circular'
    ? 'first:rounded-l-full last:rounded-r-full'
    : 'first:rounded-l-md last:rounded-r-md';
}

export function ButtonGroup(props: ButtonGroupProps): ReactElement {
  const {
    children,
    variant = 'white',
    color = 'primary',
    size = 'medium',
    roundness = 'light',
    disabled = false,
  } = props;

  const value = useMemo(() => {
    return { color, variant, size, roundness, disabled };
  }, [color, disabled, roundness, size, variant]);

  return (
    <context.Provider value={value}>
      <div
        className={clsx(
          'inline-flex flex-row items-center shadow-xs',
          getButtonGroupRoundness(roundness),
        )}
      >
        {children}
      </div>
    </context.Provider>
  );
}

export function ButtonGroupButton<T extends ElementType = 'button'>(
  props: ButtonProps<T>,
) {
  const ctx = useContext(context);

  if (ctx === null) {
    throw new Error('context for ButtonGroup was not provided');
  }

  const {
    variant = ctx.variant,
    color = ctx.color,
    size = ctx.size,
    roundness = ctx.roundness,
    disabled = ctx.disabled,
    className,
  } = props;

  return (
    <Button
      {...props}
      variant={variant}
      color={color}
      size={size}
      roundness={roundness}
      disabled={disabled}
      className={clsx(
        className,
        variant === 'primary' && 'focus-visible:ring-1',
        '-ml-px rounded-none first:ml-0 focus-visible:z-10',
        getButtonGroupRoundness(roundness),
      )}
    />
  );
}

/**
 * @deprecated Use ButtonGroupButton instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
ButtonGroup.Button = ButtonGroupButton;

export function ButtonGroupDropdown<T>(
  props: Omit<
    DropdownAsButtonProps<T>,
    'buttonClassName' | 'noDefaultButtonStyle'
  > &
    Pick<ButtonProps, 'variant' | 'color'>,
) {
  const ctx = useContext(context);

  if (ctx === null) {
    throw new Error('context for ButtonGroup was not provided');
  }

  const className = getButtonClassName({
    ...ctx,
    ...props,
  });

  return (
    <Dropdown
      {...props}
      className="-ml-px"
      buttonClassName={clsx(
        className,
        'rounded-l-none',
        ctx.roundness === 'full' ? 'rounded-r-full' : 'rounded-r-md',
      )}
      noDefaultButtonStyle
      {...ctx}
    />
  );
}

/**
 * @deprecated Use ButtonGroupDropdown instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
ButtonGroup.Dropdown = ButtonGroupDropdown;
