import { SvgOutlineExternalLink } from '@/components/tailwind-ui';

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
          <SvgOutlineExternalLink style={{ display: 'inline' }} />
        </a>
      </div>
      <div className="text-xs italic">{reference.description}</div>
      <div className="text-center font-bold">{reference.name}</div>
    </div>
  );
}
