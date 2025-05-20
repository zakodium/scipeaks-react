import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { LocaleProvider } from './LocaleProvider';
import { useLocaleProvider } from './LocaleProvider.context';
import type { TranslationsContext } from './translations.context';
import { translationsContext, useTranslations } from './translations.context';
import type { Translations } from './translations.types';

export interface TranslationsProviderProps {
  translations: TranslationsContext['translations'];
  children: ReactNode;
}

export function TranslationsProvider(props: TranslationsProviderProps) {
  const { children, translations } = props;
  const topLevel = useTranslations();
  const locale = useLocaleProvider();

  const value = useMemo<TranslationsContext>(() => {
    const mergeOverride = merge(topLevel, translations);

    return {
      translations: mergeOverride,
    };
  }, [topLevel, translations]);

  return (
    <translationsContext.Provider value={value}>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </translationsContext.Provider>
  );
}

function merge(
  obj: Record<string, Translations>,
  parse: Record<string, Translations>,
): Record<string, Translations> {
  const newObj = structuredClone(obj);

  for (const [lang, values] of Object.entries(parse)) {
    newObj[lang] ??= {};
    Object.assign(newObj[lang], values);
  }

  return newObj;
}
