import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { ElementType, ReactElement, ReactNode } from 'react';
import { createElement, useRef } from 'react';
import { useKbsDisableGlobal } from 'react-kbs';

import { IconButton } from '../../elements/buttons/icon_button/IconButton';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Transition } from '../../transition/Transition';
import { TransitionGroup } from '../../transition/TransitionGroup';
import type { PropsOf, Size } from '../../types';
import { Portal } from '../Portal';

function getSizeClassname(size: Size | false): string | undefined {
  if (!size) return;

  const record: Record<Size, string> = {
    xSmall: 'max-w-xs',
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
    xLarge: 'max-w-xl',
  };

  return record[size];
}

export interface SlideOverProps<T extends ElementType> {
  isOpen: boolean;
  /**
   * should be (in order, all optionals, at least two)
   * - SlideOverHeader / SlideOver.Header
   * - SlideOverContent / SlideOver.Content
   * - SlideOverFooter / SlideOver.Footer
   */
  children: ReactElement[];
  onClose?: () => void;
  wrapperComponent?: T;
  wrapperProps?: Omit<PropsOf<T>, 'children'>;
  requestCloseOnClickOutside?: boolean;
  allowPageInteraction?: boolean;
  afterOpen?: () => void;
  afterClose?: () => void;
  hasCloseButton?: boolean;
  /**
   * if you set false, set your custom size with `className` props
   * @default Size.medium
   */
  maxWidth?: Size | false;
  className?: string;
}

/**
 * @deprecated use `DrawerRoot` instead
 */
export function SlideOver<T extends ElementType>(props: SlideOverProps<T>) {
  const {
    requestCloseOnClickOutside = true,
    allowPageInteraction = false,
    hasCloseButton = true,
    children,
    isOpen,
    onClose,
    afterOpen,
    afterClose,
    wrapperComponent,
    wrapperProps,
    maxWidth = 'medium',
    className,
  } = props;

  useKbsDisableGlobal(isOpen);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    if (requestCloseOnClickOutside) {
      onClose?.();
    }
  });

  let slideOverContents = (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Transition
        as="section"
        enter="animate-(--animate-private_slideOverShow_500)"
        leave="animate-(--animate-private_slideOverHide_500)"
        className={clsx(
          'pointer-events-auto',
          'absolute inset-y-0 right-0', // positioning
          'w-screen', // responsive sizing
          getSizeClassname(maxWidth), // sizing
          'pl-10', //spacing
          className,
        )}
      >
        <div
          ref={ref}
          style={{
            gridTemplateColumns: '1fr auto',
            gridTemplateRows: 'auto 1fr auto',
            gridTemplateAreas:
              "'header close' 'content content' 'footer footer'",
          }}
          className="grid h-full gap-y-6 bg-white pt-6 shadow-sm"
        >
          {onClose && hasCloseButton && (
            <div style={{ gridArea: 'close' }} className="h-7 pr-4 sm:pr-6">
              <IconButton
                onClick={onClose}
                icon={<XMarkIcon />}
                size="6"
                className="rounded-full bg-white text-neutral-400 hover:text-neutral-500 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
                color="none"
              />
            </div>
          )}
          {children}
        </div>
      </Transition>
    </div>
  );

  if (wrapperComponent) {
    slideOverContents = createElement(
      wrapperComponent,
      wrapperProps,
      slideOverContents,
    );
  }

  return (
    <Portal>
      <TransitionGroup
        isOpen={isOpen}
        timeout={500}
        onEntered={afterOpen}
        onExited={afterClose}
        className={clsx(
          'fixed inset-0 z-50 overflow-hidden',
          allowPageInteraction && 'pointer-events-none',
        )}
      >
        {slideOverContents}
      </TransitionGroup>
    </Portal>
  );
}

export function SlideOverHeader(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <header
      style={{ gridArea: 'header' }}
      className={clsx('px-4 sm:px-6', props.className)}
    >
      {props.children}
    </header>
  );
}

/**
 * @deprecated use `DrawerTitle` instead
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
SlideOver.Header = SlideOverHeader;

export function SlideOverContent(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      style={{ gridArea: 'content' }}
      className={clsx(
        'relative flex-1 overflow-y-auto px-4 sm:px-6',
        props.className,
      )}
    >
      {props.children}
    </main>
  );
}

/**
 * @deprecated use `DrawerBody` instead
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
SlideOver.Content = SlideOverContent;

export function SlideOverFooter(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <footer
      style={{ gridArea: 'footer' }}
      className={clsx(
        'flex shrink-0 justify-end space-x-3 border-t border-neutral-200 px-4 py-4 sm:px-6',
        props.className,
      )}
    >
      {props.children}
    </footer>
  );
}

/**
 * @deprecated use `DrawerFooter` instead
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
SlideOver.Footer = SlideOverFooter;
