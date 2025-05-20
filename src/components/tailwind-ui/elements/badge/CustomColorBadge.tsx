import type { Ref } from 'react';
import { forwardRef } from 'react';

import { ColoredDot } from './ColoredDot';
import { DismissButton } from './DismissButton';
import type { CustomColorBadgeProps } from './badge.types';
import { getBadgeClassName, getBadgeStyle } from './badge.utils';

export const CustomColorBadge = forwardRef(function CustomColorBadgeForwardRef(
  props: CustomColorBadgeProps,
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
    textColor,
    backgroundColor,
    ...otherProps
  } = props;
  const customStyles = getBadgeStyle(props);

  return (
    <span
      ref={ref}
      className={getBadgeClassName(props)}
      style={customStyles}
      {...otherProps}
    >
      {dot && <ColoredDot variant={variant} customColor={props.textColor} />}
      {label}
      <DismissButton onDismiss={onDismiss} customColor={customStyles?.color} />
    </span>
  );
});
