import ExternalLink from './ExternalLink.js';

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
        <ExternalLink text={reference.sourceName} url={reference.url} />
      </div>
      <div className="text-xs italic">{reference.description}</div>
      <div className="text-center font-bold">{reference.name}</div>
    </div>
  );
}
