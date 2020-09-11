import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { Color, Size, Variant } from '../../types';

import { getVariantColor, sizes } from './utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface IButtonProps extends ButtonProps {
  color?: Color;
  size?: Size;
  variant?: Variant;
  group?: string;
  children: ReactNode;
}

function HoverButton(props: IButtonProps): JSX.Element {
  const { color = Color.primary } = props;

  return (
    <button
      type="button"
      {...props}
      className={classNames(
        'inline-flex rounded-md p-1.5 focus:outline-none transition ease-in-out duration-150',
        getVariantColor(Variant.hover, color),
      )}
    >
      {props.children}
    </button>
  );
}

export function Button(props: IButtonProps): JSX.Element {
  const {
    color = Color.primary,
    size = Size.medium,
    children,
    variant = Variant.primary,
    type = 'button',
    className,
    ...other
  } = props;

  if (props.variant === Variant.hover) {
    return <HoverButton {...props} />;
  }

  return (
    <span
      className={classNames(
        'inline-flex shadow-sm border border-transparent',
        className,
        getVariantColor(variant, color),
        {
          'rounded-l-md': props.group === 'left',
          'rounded-r-md': props.group === 'right',
          'rounded-md': !props.group,
        },
      )}
    >
      <button
        {...other}
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={classNames(
          'w-full inline-flex items-center font-medium text-white focus:outline-none',
          getVariantColor(variant, color),
          sizes[size],
          {
            'opacity-50 cursor-default': props.disabled,
            'rounded-l-md': props.group === 'left',
            'rounded-r-md': props.group === 'right',
            'rounded-md': !props.group,
          },
        )}
      >
        <span className="w-full">{children}</span>
      </button>
    </span>
  );
}
