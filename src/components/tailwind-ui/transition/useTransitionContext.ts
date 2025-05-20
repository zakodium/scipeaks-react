import { createContext, useContext } from 'react';

export interface TransitionContext {
  timeout: number;
  isOpen: boolean;
}

export const transitionContext = createContext<TransitionContext | null>(null);

export function useTransitionContext() {
  const ctx = useContext(transitionContext);
  return ctx;
}
