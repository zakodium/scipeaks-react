import clsx from 'clsx';
import type {
  ButtonHTMLAttributes,
  ElementType,
  ForwardedRef,
  ReactNode,
} from 'react';

import type { Color, PropsOf, Roundness, Size, Variant } from '../../../types';
import { forwardRefWithAs } from '../../../util';
import type { WithTooltipProps } from '../../floating-ui/tooltip/Tooltip';
import { Tooltip } from '../../floating-ui/tooltip/Tooltip';
import { getButtonClassName } from '../utils';

interface ButtonPropsInternal<T extends ElementType = 'button'>
  extends WithTooltipProps {
  children: ReactNode;
  type?: T extends 'button'
    ? ButtonHTMLAttributes<HTMLButtonElement>['type']
    : 'button' | 'submit' | 'reset';
  color?: Color;
  size?: Size;
  variant?: Variant;
  roundness?: Roundness;
  as?: T;
}

export type ButtonProps<T extends ElementType = 'button'> =
  ButtonPropsInternal<T> & Omit<PropsOf<T>, 'title'>;

export const Button = forwardRefWithAs(function ButtonForwardRef<
  T extends ElementType = 'button',
>(props: ButtonProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    color = 'primary',
    size = 'medium',
    variant = 'primary',
    children,
    roundness = 'light',
    className,
    type = 'button',
    tooltip,
    tooltipDelay,
    tooltipPlacement,

    as: Component = 'button',

    ...otherProps
  } = props;

  return (
    <Tooltip
      delay={tooltipDelay}
      placement={tooltipPlacement}
      content={tooltip}
    >
      <Component
        type={Component === 'button' ? type : undefined}
        {...otherProps}
        className={clsx(
          roundness === 'full' || roundness === 'circular'
            ? 'rounded-full'
            : 'rounded-md',
          getButtonClassName({
            variant,
            roundness,
            color,
            size,
            className,
          }),
        )}
        ref={ref}
      >
        {children}
      </Component>
    </Tooltip>
  );
});
