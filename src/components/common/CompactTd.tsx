import { ReactNode } from 'react';

import { Td } from '@/components/tailwind-ui';

export default function CompactTd(props: { children: ReactNode }) {
  return (
    <Td compact className="px-6">
      {props.children}
    </Td>
  );
}
