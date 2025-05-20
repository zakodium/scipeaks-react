import clsx from 'clsx';
import { match } from 'ts-pattern';

import type { Roundness } from '../..';
import type { Color, Size, Variant } from '../../types';

const bordersPrimary: Record<Color, string> = {
  primary:
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
  neutral:
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600',
  success:
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-600',
  warning:
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-600',
  danger:
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger-600',
  alternative:
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alternative-600',
};

const bordersSecondary: Record<Color, string> = {
  primary:
    'ring-1 ring-inset ring-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
  neutral:
    'ring-1 ring-inset ring-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600',
  success:
    'ring-1 ring-inset ring-success-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-600',
  warning:
    'ring-1 ring-inset ring-warning-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-600',
  danger:
    'ring-1 ring-inset ring-danger-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger-600',
  alternative:
    'ring-1 ring-inset ring-alternative-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alternative-600',
};

const borderWhite =
  'ring-1 ring-inset ring-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

function getVariantBorder(variant: Variant, color: Color): string {
  return match(variant)
    .with('primary', () => bordersPrimary[color])
    .with('secondary', () => bordersSecondary[color])
    .with('white', () => borderWhite)
    .exhaustive();
}

const baseSizes: Record<Size, string> = {
  xSmall: 'px-2 py-1 text-xs',
  small: 'px-2 py-1 text-sm',
  medium: 'px-2.5 py-2 text-sm',
  large: 'px-3 py-2 text-sm',
  xLarge: 'px-3.5 py-2.5 text-sm',
};

const circularSizes: Record<Size, string> = {
  xSmall: 'p-1 text-xl',
  small: 'p-1.5 text-xl',
  medium: 'p-2 text-xl',
  large: 'p-2 text-2xl',
  xLarge: 'p-3 text-2xl',
};

const colorsPrimary: Record<Color, string> = {
  primary:
    'bg-primary-600 disabled:bg-primary-400 hover:bg-primary-700 active:bg-primary-800 text-white',
  neutral:
    'bg-neutral-600 disabled:bg-neutral-400 hover:bg-neutral-700 active:bg-neutral-800 text-white',
  success:
    'bg-success-600 disabled:bg-success-400 hover:bg-success-700 active:bg-success-800 text-white',
  warning:
    'bg-warning-600 disabled:bg-warning-400 hover:bg-warning-700 active:bg-warning-800 text-white',
  danger:
    'bg-danger-600 disabled:bg-danger-400 hover:bg-danger-700 active:bg-danger-800 text-white',
  alternative:
    'bg-alternative-600 disabled:bg-alternative-400 hover:bg-alternative-700 active:bg-alternative-800 text-white',
};

const colorsSecondary: Record<Color, string> = {
  primary:
    'bg-primary-100 disabled:bg-primary-50 hover:bg-primary-200 text-primary-700 disabled:text-primary-400 active:bg-primary-300',
  neutral:
    'bg-neutral-100 disabled:bg-neutral-50 hover:bg-neutral-200 text-neutral-700 disabled:text-neutral-400 active:bg-neutral-300',
  success:
    'bg-success-100 disabled:bg-success-50 hover:bg-success-200 text-success-700 disabled:text-success-400 active:bg-success-300',
  warning:
    'bg-warning-100 disabled:bg-warning-50 hover:bg-warning-200 text-warning-700 disabled:text-warning-400 active:bg-warning-300',
  danger:
    'bg-danger-100 disabled:bg-danger-50 hover:bg-danger-200 text-danger-700 disabled:text-danger-400 active:bg-danger-300',
  alternative:
    'bg-alternative-100 disabled:bg-alternative-50 hover:bg-alternative-200 text-alternative-700 disabled:text-alternative-400 active:bg-alternative-300',
};

const colorWhite =
  'text-neutral-700 disabled:text-neutral-400 bg-white disabled:bg-white hover:bg-neutral-50 active:bg-neutral-100';

function getVariantColor(variant: Variant, color: Color): string {
  return match(variant)
    .with('primary', () => colorsPrimary[color])
    .with('secondary', () => colorsSecondary[color])
    .with('white', () => colorWhite)
    .exhaustive();
}

export function getButtonClassName(options: {
  variant: Variant;
  color: Color;
  roundness: Roundness;
  size: Size;
  className?: string;
}) {
  const { variant, color, roundness, size, className } = options;

  return clsx(
    'font-semibold',
    getVariantBorder(variant, color),
    getVariantColor(variant, color),
    roundness === 'circular' ? circularSizes[size] : baseSizes[size],
    className,
  );
}
