import { Home } from 'react-iframe-bridge';
import { usePageContext } from 'vike-react/usePageContext';

const specialPages = new Set(['/_error', '/dev/base-page', '/dev/home']);

export default function HomePage() {
  const pageContext = usePageContext();
  const allPages = Object.keys(pageContext.globalContext.pages)
    .map((page) => page.slice('/src/pages'.length))
    .filter((page) => !specialPages.has(page));
  return (
    <Home
      pages={allPages}
      // rocUrl="https://demo.scipeaks.com/roc/"
      // database="eln"
    />
  );
}
