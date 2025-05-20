import type { HelpPublicProps } from './common';
import type { InputProps } from './input/Input';

export const labelColor = 'text-neutral-700';

export const labelDisabledColor = 'text-neutral-500';

export const inputText = 'text-base sm:text-sm';

export function getInputBackground(disabled: InputProps['disabled']): string {
  return disabled ? 'bg-neutral-50' : 'bg-white';
}

export const inputOutline =
  'outline-1 -outline-offset-1 focus-within:outline-2 focus-within:-outline-offset-2';

const inputColor =
  'outline-neutral-300 text-neutral-900 disabled:text-neutral-900/60 focus-within:outline-primary-500 focus-within:outline-primary-500';

const inputError =
  'outline-danger-300 text-danger-900 disabled:text-danger-900/60 focus-within:outline-danger-500 focus-within:outline-danger-500';

const inputValid =
  'outline-success-400 text-success-900 disabled:text-success-900/60 focus-within:outline-success-500 focus-within:outline-success-600';

export function getInputColor(
  error: HelpPublicProps['error'],
  valid: HelpPublicProps['valid'],
): string {
  if (error) {
    return inputError;
  } else if (valid) {
    return inputValid;
  } else {
    return inputColor;
  }
}

const inputPlaceholderColor =
  'placeholder-neutral-600/65 disabled:placeholder-neutral-600/50';
const inputPlaceholderError =
  'placeholder-danger-600/65 disabled:placeholder-danger-600/50';
const inputPlaceholderValid =
  'placeholder-success-600/65 disabled:placeholder-success-600/50';

export function getInputPlaceholder(
  error: HelpPublicProps['error'],
  valid: HelpPublicProps['valid'],
): string {
  if (error) {
    return inputPlaceholderError;
  } else if (valid) {
    return inputPlaceholderValid;
  } else {
    return inputPlaceholderColor;
  }
}
