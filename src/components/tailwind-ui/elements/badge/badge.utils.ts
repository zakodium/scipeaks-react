import clsx from 'clsx';
import type { CSSProperties } from 'react';

import type { Color } from '../../types';

import type { BadgeProps, BadgeSize } from './badge.types';

const colors: Record<Color, string> = {
  neutral: 'bg-neutral-100 text-neutral-800',
  alternative: 'bg-alternative-100 text-alternative-800',
  danger: 'bg-danger-100 text-danger-800',
  primary: 'bg-primary-100 text-primary-800',
  success: 'bg-success-100 text-success-800',
  warning: 'bg-warning-100 text-warning-800',
};

const paddings: Record<
  BadgeSize,
  Record<'basic' | 'rounded' | 'remove', string>
> = {
  small: {
    basic: 'px-2.5 py-0.5',
    rounded: 'px-2 py-0.5',
    remove: 'py-0.5 pl-2 pr-0.5',
  },
  large: {
    basic: 'px-3 py-0.5',
    rounded: 'px-2.5 py-0.5',
    remove: 'py-0.5 pl-2.5 pr-1',
  },
};

const whiteBackground = 'bg-white border border-neutral-300';

export function getBadgeClassName(props: BadgeProps) {
  const {
    variant,
    roundness = 'full',
    size = 'small',
    onDismiss,
    className,
  } = props;

  const badgeStyle = getBadgeStyle(props);

  const finalColor =
    'color' in props && variant === 'COLORED_BACKGROUND'
      ? colors[props.color ?? 'neutral']
      : whiteBackground;

  const padding = paddings[size];

  return clsx(
    'inline-flex items-center font-semibold text-nowrap',
    size === 'large' ? 'text-sm' : 'text-xs',
    badgeStyle ? undefined : finalColor,
    roundness === 'rounded'
      ? size === 'large'
        ? 'rounded-md'
        : 'rounded-sm'
      : 'rounded-full',
    onDismiss
      ? padding.remove
      : roundness === 'full'
        ? padding.rounded
        : padding.basic,
    className,
  );
}

export function getBadgeStyle(props: BadgeProps): CSSProperties | undefined {
  if (
    props.variant === 'CUSTOM_COLOR' &&
    props.backgroundColor &&
    props.textColor
  ) {
    return {
      backgroundColor: props.backgroundColor,
      color: props.textColor,
    };
  }
}
