import { ExternalLinkIcon } from '@heroicons/react/outline';

export default function Reference(props: {
  reference: {
    url: string;
    sourceName: string;
    name: string;
    description: string;
  };
}) {
  const { reference } = props;
  return (
    <div>
      <div className="font-bold">
        {reference.sourceName}{' '}
        <a href={reference.url} rel="noreferrer" target="_blank">
          <ExternalLinkIcon className="inline w-5 h-5" />
        </a>
      </div>
      <div className="text-xs italic">{reference.description}</div>
      <div className="font-bold text-center">{reference.name}</div>
    </div>
  );
}
