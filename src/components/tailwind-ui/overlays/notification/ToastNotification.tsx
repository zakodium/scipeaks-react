import { XMarkIcon } from '@heroicons/react/24/outline';
import * as RadixToast from '@radix-ui/react-toast';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { NotificationState } from './NotificationContext';

export interface ToastNotificationProps
  extends Omit<
    NotificationState,
    'title' | 'content' | 'icon' | 'isToast' | 'type' | 'state'
  > {
  label: ReactNode;
  onDismiss: () => void;
  isTop: boolean;
  action?: {
    label: string;
    handle: () => void;
  };
  isOpen: boolean;
  duration: number;
}

export function ToastNotification(props: ToastNotificationProps) {
  const { label, action, onDismiss, isTop, isOpen, duration } = props;

  return (
    <RadixToast.Provider
      duration={duration}
      swipeDirection={isTop ? 'up' : 'down'}
      // Smaller threshold on toast notifications because of their limited height
      swipeThreshold={30}
    >
      <RadixToast.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            onDismiss();
          }
        }}
        className={clsx(
          'pointer-events-auto flex w-full flex-row items-center bg-neutral-700 p-2 sm:max-w-sm sm:rounded-lg sm:ring-1 sm:ring-black/5',
          // 1.25rem equals to padding of p-5 set on notification center
          '[--viewport-padding:_1.25rem]',
          // Move vertically on swipe
          'data-[swipe=move]:translate-y-[var(--radix-toast-swipe-move-y)]',
          // Move back to original position on cancel
          'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]',
          // Fade out on timeout / close
          'data-[state=closed]:animate-(--animate-private_notificationHide_200)',

          // Slide in on open
          isTop
            ? 'data-[state=open]:animate-(--animate-private_notificationShowFromTop_300)'
            : 'data-[state=open]:animate-(--animate-private_notificationShowFromBottom_300)',
          // Slide out on swipe
          isTop
            ? 'data-[swipe=end]:animate-(--animate-private_notificationHideToTop_200)'
            : 'data-[swipe=end]:animate-(--animate-private_notificationHideToBottom_200)',
        )}
      >
        <RadixToast.Title className="ml-3 flex-1 overflow-hidden pt-0.5 text-ellipsis text-white">
          {label}
        </RadixToast.Title>
        {action && (
          <RadixToast.Action
            onClick={action.handle}
            className="mr-2 rounded-md border border-transparent bg-neutral-700 p-1.5 font-semibold text-primary-300 shadow-xs ring-white hover:bg-neutral-100 hover:text-primary-800 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-700 active:bg-neutral-50"
            altText={action.label}
          >
            {action.label}
          </RadixToast.Action>
        )}

        <RadixToast.Action
          altText="close"
          onClick={onDismiss}
          className="rounded-full bg-neutral-700 p-1.5 text-neutral-300 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-100 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-700 active:bg-neutral-50"
        >
          <XMarkIcon className="size-5" />
        </RadixToast.Action>
      </RadixToast.Root>
      <RadixToast.Viewport />
    </RadixToast.Provider>
  );
}
