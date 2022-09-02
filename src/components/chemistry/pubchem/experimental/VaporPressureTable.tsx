import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

import ExternalLink from '../ExternalLink';
import Vp from '../Vp';

export default function VaporPressureTable(props: { data: any }) {
  const { data } = props;
  if (!data) return <></>;
  return (
    <div>
      <div className="pt-5 text-xl">Vapor pressure</div>
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
        <Vp data={value?.data?.parsed} />
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
