import clsx from 'clsx';
import type { CSSProperties } from 'react';

import type { Color } from '../../types';

import type { BadgeSize } from './badge.types';

interface CustomColorColoredDotProps {
  size?: BadgeSize;
  variant: 'COLORED_DOT' | 'CUSTOM_COLOR';
  customColor: CSSProperties['color'];
}

interface ColoredBackgroundDotProps {
  size?: BadgeSize;
  variant: 'COLORED_BACKGROUND';
  color?: Color;
}

type ColoredDotProps = CustomColorColoredDotProps | ColoredBackgroundDotProps;

const dotColors: Record<Color, string> = {
  neutral: 'text-neutral-400',
  alternative: 'text-alternative-400',
  danger: 'text-danger-400',
  primary: 'text-primary-400',
  success: 'text-success-400',
  warning: 'text-warning-400',
};

export function ColoredDot(props: ColoredDotProps) {
  const { size = 'small', variant } = props;

  const color = 'color' in props ? props.color : undefined;
  return (
    <svg
      className={clsx('mr-1.5 size-2', size === 'large' ? '-ml-1' : '-ml-0.5', {
        [dotColors[color ?? 'neutral']]:
          variant === 'COLORED_BACKGROUND' && color,
      })}
      fill="currentColor"
      viewBox="0 0 8 8"
      style={{
        color:
          variant === 'COLORED_DOT' && 'customColor' in props
            ? props.customColor
            : undefined,
      }}
    >
      <circle cx="4" cy="4" r="3" />
    </svg>
  );
}
