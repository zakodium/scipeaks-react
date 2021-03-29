import clsx from 'clsx';
import { ReactNode } from 'react';

import { Td } from '@/components/tailwind-ui';

export default function CompactTd(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Td
      compact
      className={clsx('px-6', props.className)}
      style={{ whiteSpace: 'normal' }}
    >
      {props.children}
    </Td>
  );
}
