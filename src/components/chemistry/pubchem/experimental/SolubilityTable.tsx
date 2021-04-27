import CompactTd from '@/components/common/CompactTd';
import { SvgOutlineExternalLink, Table, Th } from '@/components/tailwind-ui';

export default function SolubilityTable(props: { data: any }) {
  const { data } = props;
  return (
    <div>
      <div className="pt-5 text-xl">Solubility</div>
      {data?.length ? (
        <Table Header={Header} data={data} Tr={Row} />
      ) : (
        <>No solubility data found.</>
      )}
    </div>
  );
}

function Header() {
  return (
    <tr>
      <Th className="w-3/4">Original value</Th>
      <Th>Reference</Th>
    </tr>
  );
}

function Row(props: any) {
  const value = props.value;
  return (
    <tr key={value.label}>
      <CompactTd>{value.data.original}</CompactTd>
      <CompactTd>
        <div>
          {value.reference.sourceName}{' '}
          <a href={value.reference.url} rel="noreferrer" target="_blank">
            <SvgOutlineExternalLink style={{ display: 'inline' }} />
          </a>
        </div>
      </CompactTd>
    </tr>
  );
}
