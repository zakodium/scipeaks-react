import { createContext } from 'react';

import { ActionType } from '../types';

import {
  NotificationState,
  NotificationToastState,
} from './NotificationCenter';

export type NotificationActions =
  | ActionType<'ADD_NOTIFICATION', NotificationState | NotificationToastState>
  | ActionType<'DEL_NOTIFICATION', string>
  | ActionType<'DISAPPEAR', string>;

export interface NotificationContext {
  isEnabled: boolean;
  notifications: Array<NotificationState | NotificationToastState>;
  dispatch: (type: NotificationActions) => void;
}

export const Context = createContext<NotificationContext>({
  isEnabled: false,
  notifications: [],
  dispatch: () => {
    throw new Error('unreachable');
  },
});
