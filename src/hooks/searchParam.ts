import { usePageContext } from 'vike-react/usePageContext';

export function useSearchParam(name: string): string | null {
  const { urlParsed } = usePageContext();
  const query = urlParsed.search;
  const value = query[name];
  if (value === undefined) return null;
  return value;
}
