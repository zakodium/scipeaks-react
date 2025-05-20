import { XMarkIcon } from '@heroicons/react/24/outline';
import * as RadixDialog from '@radix-ui/react-dialog';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import { useContext, useState } from 'react';

import { IconButton } from '../../elements/buttons/icon_button/IconButton';
import { Transition } from '../../transition/Transition';
import { TransitionGroup } from '../../transition/TransitionGroup';
import type { Size } from '../../types';
import { portalContext } from '../PortalContext';
import type { DialogRootProps } from '../dialog/Dialog';

import { getDrawerSize } from './Drawer.utils';

const preventDefault = (event: Event) => event.preventDefault();

function getSizeClassname(size: Size | false): string | undefined {
  if (!size) return;
  return getDrawerSize(size);
}

export interface DrawerRootProps<T extends ElementType>
  extends Omit<
    DialogRootProps<T>,
    'iconColor' | 'icon' | 'size' | 'preventCloseOnInteractOutside'
  > {
  size?: Size | false;
  className?: string;
  afterOpenTransition?: () => void;
  afterCloseTransition?: () => void;
  preventCloseOnEscape?: boolean;

  allowPageInteraction?: boolean;
  /** If allowPageInteraction is true. preventCloseOnInteractOutside props will be ignored and considered to be true. */
  preventCloseOnInteractOutside?: boolean;
}

export function DrawerRoot<T extends ElementType>(props: DrawerRootProps<T>) {
  const element = useContext(portalContext);
  const [portal, setPortal] = useState<HTMLElement | null>(element);

  const {
    trigger,
    triggerAsChild = true,
    triggerProps,
    noCloseButton,
    allowPageInteraction = false,
    open: openProp,
    onOpenChange,
    defaultOpen = false,
    children,
    size = 'medium',
    className,
    as: As = 'div',
    asProps,
    afterCloseTransition,
    afterOpenTransition,
    preventCloseOnEscape,
    preventCloseOnInteractOutside: preventCloseOnInteractOutsideProps,
  } = props;

  const onEscapeKeyDown = preventCloseOnEscape ? preventDefault : undefined;

  // If allowPageInteraction is true, onInteractOutside should everytime be prevented
  const preventCloseOnInteractOutside = allowPageInteraction
    ? true
    : preventCloseOnInteractOutsideProps;

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <RadixDialog.Root
      open={open}
      onOpenChange={setOpen}
      defaultOpen={defaultOpen}
      modal={false}
    >
      {trigger && (
        <RadixDialog.Trigger asChild={triggerAsChild} {...triggerProps}>
          {trigger}
        </RadixDialog.Trigger>
      )}
      <RadixDialog.Portal forceMount container={element}>
        <div className="contents">
          <TransitionGroup
            className={clsx(
              'fixed inset-0 z-50 w-screen overflow-hidden',
              allowPageInteraction && 'pointer-events-none!',
            )}
            isOpen={open}
            timeout={500}
            onEntered={afterOpenTransition}
            onExited={afterCloseTransition}
          >
            <RadixDialog.Overlay />
            <As {...asProps}>
              <portalContext.Provider value={portal}>
                <Transition
                  enter="animate-(--animate-private_slideOverShow_500)"
                  leave="animate-(--animate-private_slideOverHide_500)"
                  className={clsx(
                    'pointer-events-auto',
                    'absolute inset-y-0 right-0', // positioning
                    'w-screen', // responsive sizing
                    getSizeClassname(size), // sizing
                    'sm:pl-10', // spacing (mobile fit screen, desktop always small space)
                    className,
                  )}
                >
                  <RadixDialog.Content
                    ref={setPortal}
                    onEscapeKeyDown={onEscapeKeyDown}
                    onPointerDownOutside={
                      !allowPageInteraction && preventCloseOnInteractOutside
                        ? preventDefault
                        : undefined
                    }
                    onInteractOutside={
                      preventCloseOnInteractOutside ? preventDefault : undefined
                    }
                    style={{
                      gridTemplateColumns: '1fr auto',
                      gridTemplateRows: 'auto 1fr auto',
                      gridTemplateAreas:
                        "'header close' 'content content' 'footer footer'",
                    }}
                    className="grid h-full gap-y-6 bg-white pt-6 shadow-sm"
                    aria-describedby={undefined}
                  >
                    {children}

                    {!noCloseButton && (
                      <div
                        style={{ gridArea: 'close' }}
                        className="h-7 pr-4 sm:pr-6"
                      >
                        <RadixDialog.Close asChild>
                          <IconButton
                            icon={<XMarkIcon />}
                            size="6"
                            className="rounded-full bg-white text-neutral-400 hover:text-neutral-500 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-500"
                            color="none"
                          />
                        </RadixDialog.Close>
                      </div>
                    )}
                  </RadixDialog.Content>
                </Transition>
              </portalContext.Provider>
            </As>
          </TransitionGroup>
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

interface DrawerTitleProps {
  children: ReactNode;
  className?: string;
}

export function DrawerTitle(props: DrawerTitleProps) {
  const { children, className } = props;

  return (
    <RadixDialog.Title
      style={{ gridArea: 'header' }}
      className={clsx('px-4 sm:px-6', className)}
    >
      {children}
    </RadixDialog.Title>
  );
}

interface DrawerBodyProps {
  children: ReactNode;
  className?: string;
}

export function DrawerBody(props: DrawerBodyProps) {
  const { children, className } = props;

  return (
    <main
      style={{ gridArea: 'content' }}
      className={clsx(
        'relative flex-1 overflow-y-auto px-4 sm:px-6',
        className,
      )}
    >
      {children}
    </main>
  );
}

interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}

export function DrawerFooter(props: DrawerFooterProps) {
  const { children, className } = props;

  return (
    <footer
      style={{ gridArea: 'footer' }}
      className={clsx(
        'flex shrink-0 justify-end space-x-3 border-t border-neutral-200 px-4 py-4 sm:px-6',
        className,
      )}
    >
      {children}
    </footer>
  );
}

const DrawerClose = RadixDialog.Close;
export { DrawerClose };
