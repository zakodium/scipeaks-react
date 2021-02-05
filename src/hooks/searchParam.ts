import { useRouter } from 'next/router';

export function useSearchParam(name: string): string | null {
  const { query } = useRouter();
  const value = query[name];
  if (typeof value === 'undefined') return null;
  if (typeof value === 'string') return value;
  return value[0];
}
