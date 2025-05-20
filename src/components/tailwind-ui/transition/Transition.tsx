import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import { useRef } from 'react';
import { Transition as RTGTransition } from 'react-transition-group';

import { useTransitionContext } from './useTransitionContext';

interface TransitionProps {
  /**
   * timeout has to be the same amount of milliseconds as in the animation
   */
  timeout?: number;

  /**
   * Tell if the component is displayed to run the animation
   */
  isOpen?: boolean;

  enter: string;
  leave: string;

  children: ReactNode;
  className?: string;

  as?: ElementType;
}

export function Transition(props: TransitionProps) {
  const {
    enter,
    leave,
    children,
    timeout,
    isOpen,
    className,
    as: Component = 'div',
  } = props;

  const ref = useRef<HTMLElement | null>(null);
  const animationContext = useTransitionContext();

  return (
    <RTGTransition
      in={animationContext?.isOpen || isOpen || false}
      timeout={animationContext?.timeout || timeout || 500}
      nodeRef={ref}
      unmountOnExit
      mountOnEnter
    >
      {(state) => (
        <Component
          ref={ref}
          className={clsx(className, {
            [enter]: state === 'entered',
            [leave]: state === 'exiting' || state === 'exited',
          })}
        >
          {children}
        </Component>
      )}
    </RTGTransition>
  );
}
