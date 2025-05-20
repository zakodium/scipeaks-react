import { useContext } from 'react';

import type { NotificationContext } from '../notification/NotificationContext';
import { notificationContext } from '../notification/NotificationContext';

export function useNotificationCenter(): NotificationContext {
  const context = useContext(notificationContext);

  if (context === null) {
    throw new Error('Missing notification context');
  }

  return context;
}
