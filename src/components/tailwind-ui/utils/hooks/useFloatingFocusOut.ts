import type { ElementProps } from '@floating-ui/react';
import { useMemo, useRef } from 'react';

export function useFloatingFocusOut(callback: () => void): ElementProps {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useMemo(
    () => ({
      reference: {
        onBlur: (event) => {
          // Seems clicking on item in list trigger onBlur event
          // relatedTarget is not empty in this case
          // relatedTarget is empty when clicking outside the component
          //  or press escape key
          //  or press tab key
          if (event.relatedTarget) return;

          callbackRef.current();
        },
      },
    }),
    [],
  );
}
