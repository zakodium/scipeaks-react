import { createContext, useContext } from 'react';

export const localeContext = createContext<string>('en');

export function useLocaleProvider() {
  const context = useContext(localeContext);
  return context;
}
