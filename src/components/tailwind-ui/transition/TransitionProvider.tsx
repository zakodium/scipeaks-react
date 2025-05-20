import type { ReactNode } from 'react';
import { useMemo } from 'react';

import type { TransitionContext } from './useTransitionContext';
import { transitionContext } from './useTransitionContext';

interface TransitionProviderProps extends TransitionContext {
  children: ReactNode;
}

export function TransitionProvider(props: TransitionProviderProps) {
  const { children, isOpen, timeout } = props;

  const value = useMemo(() => {
    return { isOpen, timeout };
  }, [isOpen, timeout]);

  return (
    <transitionContext.Provider value={value}>
      {children}
    </transitionContext.Provider>
  );
}
