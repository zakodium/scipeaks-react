import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

import Bp from '../Bp';
import ExternalLink from '../ExternalLink';

export default function BpTable(props: { data: any }) {
  const { data } = props;
  if (!data) return <>No boiling point data found.</>;
  return (
    <div>
      <div className="pt-5 text-xl">Boiling point</div>
      <Table renderHeader={renderHeader} data={data} renderTr={Row} />
    </div>
  );
}

function renderHeader() {
  return (
    <tr>
      <Th>Original value</Th>
      <Th>Parsed</Th>
      <Th>Reference</Th>
    </tr>
  );
}

function Row(value: any) {
  return (
    <tr key={value.label}>
      <CompactTd>{value.data.original}</CompactTd>
      <CompactTd>
        <Bp data={value?.data?.parsed} />
      </CompactTd>
      <CompactTd>
        <ExternalLink
          text={value.reference.sourceName}
          url={value.reference.url}
        />
      </CompactTd>
    </tr>
  );
}
