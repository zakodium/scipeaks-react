import { ExternalLinkIcon } from '@heroicons/react/outline';

import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

import Bp from '../Bp';

export default function BpTable(props: { data: any }) {
  const { data } = props;
  if (!data) return <>No boiling point data found.</>;
  return (
    <div>
      <div className="pt-5 text-xl">Boiling point</div>
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
        <Bp data={value?.data?.parsed} />
      </CompactTd>
      <CompactTd>
        <div>
          {value.reference.sourceName}
          <a href={value.reference.url} rel="noreferrer" target="_blank">
            <ExternalLinkIcon className="inline w-5 h-5" />
          </a>
        </div>
      </CompactTd>
    </tr>
  );
}
