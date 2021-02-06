import { PageNotFoundErrorPage } from '@/components/tailwind-ui';

export default function Page404() {
  return (
    <PageNotFoundErrorPage
      url={typeof window !== 'undefined' ? window.location.href : 'unknown'}
    />
  );
}
