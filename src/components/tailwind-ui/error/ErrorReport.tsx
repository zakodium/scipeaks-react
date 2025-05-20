import { CheckIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';

import { Button } from '../elements/buttons/button/Button';
import { Alert } from '../feedback/Alert';
import { TranslationsText } from '../internationalization/TranslationsText';
import { useTranslation } from '../internationalization/useTranslation';
import { notificationContext } from '../overlays/notification/NotificationContext';

export function ErrorReport({
  error,
  componentStack,
}: {
  error: Error;
  componentStack?: string | null;
}) {
  const clipboard = useTranslation('error_report.clipboard');
  const notificationTitle = useTranslation('error_report.notification');

  componentStack = componentStack?.replace(/^\s+/, '');

  const details = `${
    componentStack ? `<br>${clipboard}: \n\n${componentStack}\n\n\n` : ''
  }${error.stack || ''}`;

  const context = useContext(notificationContext);

  return (
    <div className="text-justify">
      <Alert
        title={<TranslationsText textKey="error_report.alert.title" />}
        type="warning"
      >
        <div>
          <TranslationsText textKey="error_report.alert.content" />
        </div>
        <Button
          className="mt-3"
          onClick={() => {
            void navigator.clipboard.writeText(details).then(() => {
              if (context) {
                context.addNotification(
                  {
                    title: notificationTitle,
                    content: '',
                    type: 'success',
                    icon: <CheckIcon className="text-success-600" />,
                  },
                  3000,
                );
              }
            });
          }}
          color="warning"
        >
          <TranslationsText textKey="error_report.button" />
        </Button>
      </Alert>
      {process.env.NODE_ENV === 'development' && (
        <Alert type="error" title="Debug stack trace" className="mt-2">
          <code className="block whitespace-pre">{details}</code>
        </Alert>
      )}
    </div>
  );
}
