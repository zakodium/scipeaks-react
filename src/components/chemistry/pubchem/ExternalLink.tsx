import { ExternalLinkIcon } from '@heroicons/react/outline';

interface ExternalLinkProps {
  text?: string;
  url: string;
}

export default function ExternalLink(props: ExternalLinkProps) {
  return (
    <>
      {props.text || null}
      <a
        href={props.url}
        className={props.text && 'ml-1'}
        rel="noreferrer"
        target="_blank"
      >
        <ExternalLinkIcon className="inline h-4 w-4" />
      </a>
    </>
  );
}
