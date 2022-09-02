import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

import ExternalLink from '../ExternalLink';
import LowHighUnits from '../LowHighUnits';

export default function MpTable(props: { data: any }) {
  const { data } = props;
  if (!data) return <>No melting point data found</>;
  return (
    <div>
      <div className="pt-5 text-xl">Melting point</div>
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
        <LowHighUnits data={value?.data?.parsed} />
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
