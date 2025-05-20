import { PencilSquareIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { forwardRef } from 'react';

import type { Color } from '../../../types';
import type { WithTooltipProps } from '../../floating-ui/tooltip/Tooltip';
import { Tooltip } from '../../floating-ui/tooltip/Tooltip';

type IconButtonSize = '4' | '5' | '6';
type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface IconButtonProps
  extends Omit<ButtonProps, 'title' | 'children'>,
    WithTooltipProps {
  size: IconButtonSize;
  icon?: ReactNode;
  color?: Color | 'none';
  noBlock?: boolean;
}

const colors: Record<Color, string> = {
  primary: 'text-primary-600',
  neutral: 'text-neutral-600',
  success: 'text-success-600',
  warning: 'text-warning-600',
  danger: 'text-danger-600',
  alternative: 'text-alternative-600',
};

const sizes: Record<IconButtonSize, string> = {
  4: 'size-4',
  5: 'size-5',
  6: 'size-6',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButtonInternal(props: IconButtonProps, ref) {
    const {
      onClick,
      size,
      icon = <PencilSquareIcon />,
      color = 'neutral',
      className,
      style,
      noBlock,

      tooltip,
      tooltipDelay,
      tooltipPlacement,

      ...others
    } = props;

    return (
      <Tooltip
        content={tooltip}
        delay={tooltipDelay}
        placement={tooltipPlacement}
      >
        <button
          type="button"
          ref={ref}
          onClick={onClick}
          style={style}
          className={clsx(color !== 'none' && colors[color], className, {
            block: !noBlock,
          })}
          {...others}
        >
          <div className={sizes[size]}>{icon}</div>
        </button>
      </Tooltip>
    );
  },
);
