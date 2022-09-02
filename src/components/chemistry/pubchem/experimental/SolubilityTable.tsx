import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

import ExternalLink from '../ExternalLink';

export default function SolubilityTable(props: { data: any }) {
  const { data } = props;
  if (!data) return <>No solubility data found.</>;
  return (
    <div>
      <div className="pt-5 text-xl">Solubility</div>
      <Table renderHeader={renderHeader} data={data} renderTr={Row} />
    </div>
  );
}

function renderHeader() {
  return (
    <tr>
      <Th className="w-3/4">Original value</Th>
      <Th>Reference</Th>
    </tr>
  );
}

function Row(value: any) {
  return (
    <tr key={value.label}>
      <CompactTd>{value.data.original}</CompactTd>
      <CompactTd>
        <ExternalLink
          text={value.reference.sourceName}
          url={value.reference.url}
        />
      </CompactTd>
    </tr>
  );
}
