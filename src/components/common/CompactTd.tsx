import clsx from 'clsx';
import { ReactNode } from 'react';

import { Td } from '@/components/tailwind-ui';

export default function CompactTd(props: {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <Td
      compact
      wrap
      className={clsx('px-6', props.className)}
      style={props.style}
    >
      {props.children}
    </Td>
  );
}
