import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import type en from './translations/en.json';
import { useTranslations } from './translations.context';

export type TranslationKeys = keyof typeof en;

interface TranslationsTextProps {
  textKey: TranslationKeys | string;
  values?: Record<
    string,
    ReactNode | Date | ((children: ReactNode) => ReactNode)
  >;
}

export function TranslationsText(props: TranslationsTextProps) {
  const { textKey, values = {} } = props;
  const translations = useTranslations();

  return (
    <FormattedMessage
      id={textKey}
      defaultMessage={translations.en[textKey] ?? textKey}
      values={values}
    />
  );
}
