import { PageNotFoundErrorPage } from '../components/tailwind-ui/error/PageNotFoundErrorPage';

export default function Page404() {
  return <PageNotFoundErrorPage url={window.location.href} />;
}
