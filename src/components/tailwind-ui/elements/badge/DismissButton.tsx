import clsx from 'clsx';
import type { CSSProperties, MouseEvent } from 'react';

import type { Color } from '../../types';

const removeColors: Record<Color, string> = {
  neutral:
    'text-neutral-400 hover:bg-neutral-200 hover:text-neutral-500 focus-visible:bg-neutral-500',
  alternative:
    'text-alternative-400 hover:bg-alternative-200 hover:text-alternative-500 focus-visible:bg-alternative-500',
  danger:
    'text-danger-400 hover:bg-danger-200 hover:text-danger-500 focus-visible:bg-danger-500',
  primary:
    'text-primary-400 hover:bg-primary-200 hover:text-primary-500 focus-visible:bg-primary-500',
  success:
    'text-success-400 hover:bg-success-200 hover:text-success-500 focus-visible:bg-success-500',
  warning:
    'text-warning-400 hover:bg-warning-200 hover:text-warning-500 focus-visible:bg-warning-500',
};

interface DismissButtonProps {
  onDismiss?: (event: MouseEvent) => void;
  customColor?: CSSProperties['color'];
  color?: Color;
}

export function DismissButton(props: DismissButtonProps) {
  const { onDismiss, customColor, color } = props;
  if (!onDismiss) return null;
  return (
    <button
      type="button"
      onClick={onDismiss}
      style={{ color: props.customColor }}
      className={clsx(
        'pointer-events-auto ml-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full focus:outline-hidden focus-visible:text-white',
        customColor
          ? 'hover:bg-neutral-50/40'
          : removeColors[color ?? 'neutral'],
      )}
    >
      <svg
        className="size-2"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 8 8"
      >
        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  );
}
