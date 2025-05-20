import type { Ref } from 'react';
import { forwardRef } from 'react';

import { ColoredDot } from './ColoredDot';
import { DismissButton } from './DismissButton';
import type { ColoredBackgroundBadgeProps } from './badge.types';
import { getBadgeClassName } from './badge.utils';

export const ColoredBackgroundBadge = forwardRef(
  function ColoredBackgroundBadgeForwardRef(
    props: ColoredBackgroundBadgeProps,
    ref: Ref<HTMLSpanElement>,
  ) {
    const {
      variant,
      color,
      roundness,
      dot,
      className,
      size,
      onDismiss,
      label,
      ...otherProps
    } = props;

    return (
      <span ref={ref} className={getBadgeClassName(props)} {...otherProps}>
        {dot && <ColoredDot variant={variant} color={color} />}
        {label}
        <DismissButton color={color} onDismiss={onDismiss} />
      </span>
    );
  },
);
