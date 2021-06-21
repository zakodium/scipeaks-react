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
      <Table Header={Header} data={data} Tr={Row} />
    </div>
  );
}

function Header() {
  return (
    <tr>
      <Th>Original value</Th>
      <Th>Parsed</Th>
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
