import { TranslationsText } from '../../internationalization/TranslationsText';
import { useTranslation } from '../../internationalization/useTranslation';
import { ErrorPage } from '../ErrorPage';

interface PageNotFoundErrorPageProps {
  url: string;
}

export function PageNotFoundErrorPage(props: PageNotFoundErrorPageProps) {
  const title = useTranslation('page_not_found_error_page.title');

  return (
    <ErrorPage
      title={title}
      subtitle={
        <div className="flex flex-col">
          <TranslationsText textKey="page_not_found_error_page.subtitle" />
          <span>URL: {props.url}</span>
        </div>
      }
      code="404"
    />
  );
}
