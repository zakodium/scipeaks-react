import type { Size } from '../../types';

const drawerSizes: Record<Size, string> = {
  xSmall: 'max-w-xs',
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-lg',
  xLarge: 'max-w-xl',
};

export function getDrawerSize(size: Size) {
  return drawerSizes[size];
}
