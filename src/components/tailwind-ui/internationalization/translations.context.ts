import { createContext, useContext } from 'react';

import en from './translations/en.json';
import fr from './translations/fr.json';
import type { Translations } from './translations.types';

export interface TranslationsContext {
  translations: Record<string, Translations>;
}

export const translationsContext = createContext<TranslationsContext>({
  translations: {
    en,
    fr,
  },
});

export function useTranslations() {
  const context = useContext(translationsContext);
  return context.translations;
}
