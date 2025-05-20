import type { CSSProperties, MouseEvent, ReactNode } from 'react';

import type { Color } from '../../types';

export type BadgeSize = 'small' | 'large';
export type BadgeVariant =
  | 'COLORED_DOT'
  | 'COLORED_BACKGROUND'
  | 'CUSTOM_COLOR';

export interface BaseBadgeProps {
  label: ReactNode;
  size?: BadgeSize;

  /**
   * Defines the roundness of the badge.
   *
   * @default "full"
   */
  roundness?: 'full' | 'rounded';

  onDismiss?: (event: MouseEvent) => void;
  className?: string;
}

export interface ColoredDotBadgeProps extends BaseBadgeProps {
  variant: 'COLORED_DOT';
  customColor: CSSProperties['color'];
  dot?: true;
}

export interface ColoredBackgroundBadgeProps extends BaseBadgeProps {
  variant: 'COLORED_BACKGROUND';
  color?: Color;
  dot?: boolean;
}

export interface BadgeCustomColors {
  backgroundColor: CSSProperties['color'];
  textColor: CSSProperties['color'];
}

export interface CustomColorBadgeProps
  extends BaseBadgeProps,
    BadgeCustomColors {
  variant: 'CUSTOM_COLOR';
  dot?: boolean;
}

export type BadgeProps =
  | ColoredBackgroundBadgeProps
  | ColoredDotBadgeProps
  | CustomColorBadgeProps;
