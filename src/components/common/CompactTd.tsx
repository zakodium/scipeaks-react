import { ReactNode } from 'react';

import { Td } from '@/components/tailwind-ui';

export default function CompactTd(props: {
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Td compact className="px-6" style={props.style}>
      {props.children}
    </Td>
  );
}
