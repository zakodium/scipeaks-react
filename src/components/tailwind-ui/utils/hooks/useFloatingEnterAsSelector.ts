import type { ElementProps } from '@floating-ui/react';
import type { KeyboardEvent } from 'react';
import { useMemo } from 'react';

export function useFloatingEnterAsSelector(callback: () => void): ElementProps {
  const referenceProps = useMemo(
    () => ({
      onKeyDown: (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault();

          callback();
        }
      },
    }),
    [callback],
  );

  return useMemo(
    () => ({
      reference: referenceProps,
    }),
    [referenceProps],
  );
}
