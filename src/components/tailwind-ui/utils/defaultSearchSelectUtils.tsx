import type { ReactNode, UIEvent } from 'react';

import type { SimpleSelectOption } from '../forms/basic/select/Select';
import { TranslationsText } from '../internationalization/TranslationsText';
import type { Color } from '../types';

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036F]/g, '');
}

export function defaultOptionsFilter<OptionType extends SimpleSelectOption>(
  query: string,
  options: OptionType[],
): OptionType[] {
  const normalizedQuery = normalize(query);
  return options.filter((option) => {
    const renderedOption = defaultRenderOption(option);
    if (typeof renderedOption === 'object') {
      return false;
    }
    return normalize(String(renderedOption)).includes(normalizedQuery);
  });
}

export function customOptionsFilter<OptionType>(
  getText: (option: OptionType) => string,
) {
  return (query: string, options: OptionType[]) => {
    const normalizedQuery = normalize(query);
    return options.filter((obj) =>
      normalize(getText(obj)).includes(normalizedQuery),
    );
  };
}

export function defaultRenderSelectedOptions(options: unknown[]): ReactNode {
  if (options.length === 0) return null;

  return (
    <TranslationsText
      textKey="search_select.selected"
      values={{
        // eslint-disable-next-line camelcase
        num_options: options.length,
      }}
    />
  );
}

export function defaultGetValue(option: SimpleSelectOption): string | number {
  return typeof option === 'object' ? option.value : option;
}

export function defaultCanCreate() {
  return true;
}

export function defaultRenderCreate(value: string) {
  return <TranslationsText textKey="search_select.create" values={{ value }} />;
}

export function defaultGetBadgeColor(): Color {
  return 'neutral';
}

export function defaultIsOptionRemovable() {
  return true;
}

export function preventDefault(event: UIEvent) {
  event.preventDefault();
}

export function defaultRenderOption(option: SimpleSelectOption): ReactNode {
  return typeof option === 'object' ? option.label : option;
}

export const defaultNoResultsHint = 'No results.';
