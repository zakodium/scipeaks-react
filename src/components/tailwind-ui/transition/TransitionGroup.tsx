import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { TransitionProvider } from './TransitionProvider';

interface TransitionGroupProps {
  isOpen: boolean;
  timeout: number;
  className: string;
  children: ReactNode;
  onEntered?: () => void;
  onExited?: () => void;
}

export function TransitionGroup(props: TransitionGroupProps) {
  const { isOpen, timeout, children, className, onEntered, onExited } = props;
  const nodeRef = useRef<HTMLDivElement | null>(null);

  return (
    <TransitionProvider isOpen={isOpen} timeout={timeout}>
      <Transition
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        in={isOpen}
        timeout={timeout}
        onEntered={onEntered}
        onExited={onExited}
      >
        {() => (
          <div ref={nodeRef} className={className}>
            {children}
          </div>
        )}
      </Transition>
    </TransitionProvider>
  );
}
