import type { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import { noop } from '../util';

import { localeContext } from './LocaleProvider.context';
import { useTranslations } from './translations.context';

interface LocaleProviderProps {
  locale?: string;
  children: ReactNode;
}

export function LocaleProvider(props: LocaleProviderProps) {
  const { children, locale = 'en' } = props;
  const translations = useTranslations();

  return (
    <localeContext.Provider value={locale}>
      <IntlProvider
        locale={locale}
        messages={translations[locale]}
        // onError is called when fallback happens. We can ignore it.
        onError={noop}
      >
        {children}
      </IntlProvider>
    </localeContext.Provider>
  );
}
