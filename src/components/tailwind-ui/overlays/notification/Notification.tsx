import { XMarkIcon } from '@heroicons/react/24/outline';
import * as RadixToast from '@radix-ui/react-toast';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { Color } from '../../types';

import type { NotificationState } from './NotificationContext';

export interface NotificationProps
  extends Omit<NotificationState, 'content' | 'isToast' | 'state'> {
  children: ReactNode;
  className?: string;
  onDismiss: () => void;
  position: 'right' | 'left';
  duration: number;
  isOpen: boolean;
}

type ColorContainerType = Record<Color, string>;

const colors: Record<
  'shadow' | 'border' | 'containerText' | 'text',
  ColorContainerType
> = {
  shadow: {
    alternative: 'shadow-alternative-500/25',
    danger: 'shadow-danger-500/25',
    neutral: 'shadow-neutral-500/25',
    primary: 'shadow-primary-500/25',
    success: 'shadow-success-500/25',
    warning: 'shadow-warning-500/25',
  },
  border: {
    alternative: 'border-alternative-400',
    danger: 'border-danger-400',
    neutral: 'border-neutral-400',
    primary: 'border-primary-400',
    success: 'border-success-400',
    warning: 'border-warning-400',
  },
  containerText: {
    alternative: 'text-alternative-500',
    danger: 'text-danger-500',
    neutral: 'text-neutral-500',
    primary: 'text-primary-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
  },
  text: {
    alternative: 'text-alternative-800',
    danger: 'text-danger-800',
    neutral: 'text-neutral-800',
    primary: 'text-primary-800',
    success: 'text-success-800',
    warning: 'text-warning-800',
  },
};

export function Notification(props: NotificationProps) {
  const {
    icon,
    title,
    type = 'neutral',
    children,
    className,
    onDismiss,
    position,
    duration,
    isOpen,
  } = props;

  return (
    <RadixToast.Provider duration={duration} swipeDirection={position}>
      <RadixToast.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            onDismiss();
          }
        }}
        className={clsx(
          'pointer-events-auto z-40 flex w-full max-w-sm flex-row items-start overflow-hidden rounded-lg border bg-white p-4 shadow-md',
          // 1.25rem equals to padding of p-5 set on notification center
          '[--viewport-padding:1.25rem]',
          // Move back to original position on cancel
          'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]',
          // Move horizontally on swipe
          'data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)',
          // Fade out on timeout / close
          'data-[state=closed]:animate-(--animate-private_notificationHide_200)',
          className,
          colors.shadow[type],
          colors.border[type],
          // Slide in on open
          position === 'right'
            ? 'data-[state=open]:animate-(--animate-private_notificationShowFromRight_300)'
            : 'data-[state=open]:animate-(--animate-private_notificationShowFromLeft_300)',
          // Slide out on swipe
          position === 'right'
            ? 'data-[swipe=end]:animate-(--animate-private_notificationHideToRight_200)'
            : 'data-[swipe=end]:animate-(--animate-private_notificationHideToLeft_200)',
        )}
      >
        <RadixToast.Title className="flex flex-1 items-start">
          <div className="size-5 shrink-0 text-xl text-neutral-600">{icon}</div>
          <div
            className={clsx(
              'ml-3 w-0 flex-1 overflow-hidden pt-0.5 text-ellipsis',
              colors.containerText[type],
            )}
          >
            {title && (
              <p
                className={clsx(
                  'overflow-hidden text-sm font-semibold text-ellipsis',
                  colors.text[type],
                )}
              >
                {title}
              </p>
            )}

            {children}
          </div>
        </RadixToast.Title>
        <RadixToast.Action
          altText="close"
          onClick={onDismiss}
          className="inline-flex text-neutral-400 transition duration-150 ease-in-out focus:text-neutral-500 focus:outline-hidden"
        >
          <XMarkIcon className="size-5" />
        </RadixToast.Action>
      </RadixToast.Root>
      <RadixToast.Viewport />
    </RadixToast.Provider>
  );
}
