import ExternalLink from './ExternalLink';

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
      <div className="font-bold text-center">{reference.name}</div>
    </div>
  );
}
