import type { Ref } from 'react';
import { forwardRef } from 'react';

import { ColoredDot } from './ColoredDot';
import { DismissButton } from './DismissButton';
import type { ColoredDotBadgeProps } from './badge.types';
import { getBadgeClassName } from './badge.utils';

export const ColoredDotBadge = forwardRef(function ColoredDotBadgeForwardRef(
  props: ColoredDotBadgeProps,
  ref: Ref<HTMLSpanElement>,
) {
  const {
    variant,
    roundness,
    dot,
    className,
    size,
    onDismiss,
    label,
    customColor,
    ...otherProps
  } = props;
  return (
    <span ref={ref} className={getBadgeClassName(props)} {...otherProps}>
      {<ColoredDot variant={variant} customColor={customColor} />}
      {label}
      <DismissButton onDismiss={onDismiss} />
    </span>
  );
});
