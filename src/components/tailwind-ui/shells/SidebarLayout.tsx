import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { IconButton } from '../elements/buttons/icon_button/IconButton';
import { Transition } from '../transition/Transition';
import { TransitionGroup } from '../transition/TransitionGroup';

export interface SidebarLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
  revealOnLargeViewport?: boolean;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export function SidebarLayout(props: SidebarLayoutProps) {
  const {
    open,
    close,
    isOpen,
    header,
    sidebar,
    children,
    revealOnLargeViewport = true,
  } = props;
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  return (
    <div className="flex h-screen overflow-hidden">
      <TransitionGroup
        timeout={300}
        className={clsx(
          'fixed inset-0 z-40 flex',
          revealOnLargeViewport ? 'lg:hidden' : undefined,
        )}
        isOpen={isOpen}
      >
        <Transition
          enter="animate-(--animate-private_sidebarBackgroundShow_300)"
          leave="animate-(--animate-private_sidebarBackgroundHide_300)"
        >
          <div
            className="absolute inset-0 bg-neutral-600 opacity-75"
            onClick={close}
          />
        </Transition>
        <Transition
          enter="animate-(--animate-private_sidebarShow_300)"
          leave="animate-(--animate-private_sidebarHide_300)"
          className="relative flex size-full max-w-xs flex-1 flex-col bg-white"
        >
          <div className="absolute top-0 right-0 -mr-14 p-1">
            <IconButton
              className={clsx(
                'flex size-12 items-center justify-center rounded-full p-3 text-white focus:bg-neutral-600 focus:outline-hidden',
                {
                  hidden: !isOpen,
                },
              )}
              aria-label="Close sidebar"
              onClick={close}
              color="none"
              icon={<XMarkIcon />}
              size="6"
            />
          </div>
          <div className="h-full overflow-auto">{sidebar}</div>
        </Transition>
      </TransitionGroup>

      <div
        className={clsx('hidden', {
          'lg:flex lg:shrink-0': revealOnLargeViewport,
        })}
      >
        <div className="flex w-64 flex-col overflow-auto border-r border-neutral-200 bg-white">
          {sidebar}
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-auto focus:outline-hidden">
        <div className="relative z-10 flex shrink-0 border-b border-neutral-200 bg-white">
          <button
            type="button"
            className={clsx(
              'border-r border-neutral-200 px-4 text-neutral-400 focus:bg-neutral-100 focus:text-neutral-600 focus:outline-hidden',
              { 'lg:hidden': revealOnLargeViewport },
            )}
            aria-label="Open sidebar"
            onClick={open}
          >
            <Bars3BottomLeftIcon className="size-6 transition duration-150 ease-in-out" />
          </button>

          <div className="flex flex-1 justify-between">{header}</div>
        </div>
        <main className="relative z-0 flex flex-1 flex-col overflow-y-auto pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
