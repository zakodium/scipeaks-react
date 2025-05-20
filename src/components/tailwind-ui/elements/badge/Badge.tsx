import type { Ref } from 'react';
import { forwardRef } from 'react';
import { match } from 'ts-pattern';

import { ColoredBackgroundBadge } from './ColoredBackgroundBadge';
import { ColoredDotBadge } from './ColoredDotBadge';
import { CustomColorBadge } from './CustomColorBadge';
import type { BadgeProps } from './badge.types';

export const Badge = forwardRef(function BadgeForwardRef(
  props: BadgeProps,
  ref: Ref<HTMLSpanElement>,
) {
  return match(props)
    .with({ variant: 'COLORED_BACKGROUND' }, (props) => {
      return <ColoredBackgroundBadge {...props} ref={ref} />;
    })
    .with({ variant: 'COLORED_DOT' }, (props) => (
      <ColoredDotBadge {...props} ref={ref} />
    ))
    .with({ variant: 'CUSTOM_COLOR' }, (props) => (
      <CustomColorBadge {...props} ref={ref} />
    ))
    .exhaustive();
});
