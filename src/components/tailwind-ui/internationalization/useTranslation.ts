import { useLocaleProvider } from './LocaleProvider.context';
import { useTranslations } from './translations.context';

export function useTranslation(key: string) {
  const locale = useLocaleProvider();
  const translations = useTranslations();

  return translations?.[locale]?.[key] ?? translations.en[key] ?? key;
}
