import type { ReactNode } from 'react';
import { createContext } from 'react';

import type { ActionType, Color } from '../../types';

export interface NotificationConfig {
  title: ReactNode;
  content?: ReactNode;
  icon?: ReactNode;
  type?: Color;
}

export interface ToastNotificationAction {
  label: string;
  handle: () => void;
}

export interface ToastNotificationConfig {
  label: ReactNode;
  action?: ToastNotificationAction;
  group?: string;
}

export type AddNotification = (
  notification: NotificationConfig,
  timeout?: number,
) => string;

export type AddToastNotification = (
  notification: ToastNotificationConfig,
  timeout?: number,
) => string;

export type DeleteNotification = (id: string) => void;

type NotificationElement = NotificationState | ToastNotificationState;

export interface NotificationContext {
  notifications: NotificationElement[];
  addNotification: AddNotification;
  addToastNotification: AddToastNotification;
  dismissNotification: DeleteNotification;
}

export type NotificationActions =
  | ActionType<'ADD_NOTIFICATION', NotificationElement>
  | ActionType<'DELETE_NOTIFICATION', string>
  | ActionType<'CLOSE_NOTIFICATION', string>;

export const notificationContext = createContext<NotificationContext | null>(
  null,
);

interface NotificationsState {
  notifications: NotificationElement[];
}

export interface NotificationState extends NotificationConfig {
  id: string;
  duration: number;
  isOpen: boolean;
  type: Color;
  isToast: false;
}

export interface ToastNotificationState extends ToastNotificationConfig {
  id: string;
  duration: number;
  isOpen: boolean;
  isToast: true;
}

export function notificationsReducer(
  previous: NotificationsState,
  action: NotificationActions,
): NotificationsState {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      let copy = previous.notifications.slice();

      if (!action.payload.isToast) {
        copy.push({ ...action.payload, type: action.payload.type });
      } else {
        let duration = action.payload.duration;
        if (action.payload.group) {
          const group = action.payload.group;
          const groupNotification = copy.find(
            (el) => el.isToast && el.group === group,
          );
          if (groupNotification) {
            // We need to update the duration to force the timeout to be reset
            // In the radix-ui toast notification component
            duration = groupNotification.duration + 1;
          }

          copy = copy.filter((el) => el.isToast && el.group !== group);
        }

        copy.push({ ...action.payload, duration });
      }

      return { notifications: copy };
    }
    case 'DELETE_NOTIFICATION': {
      const array = previous.notifications.filter(
        (element) => element.id !== action.payload,
      );
      return { notifications: array };
    }
    case 'CLOSE_NOTIFICATION': {
      const notifications = previous.notifications.map(
        (element): NotificationElement => {
          if (element.id === action.payload) {
            return { ...element, isOpen: false };
          }
          return element;
        },
      );

      return { notifications };
    }
    default:
      throw new Error('unreachable');
  }
}
