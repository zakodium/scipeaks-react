import CompactTd from '@/components/common/CompactTd';
import { SvgOutlineExternalLink, Table, Th } from '@/components/tailwind-ui';

import LowHighUnits from '../LowHighUnits';

export default function MpTable(props: { data: any }) {
  const { data } = props;

  return (
    <div>
      <div className="pt-5 text-xl">Melting point</div>
      {data?.length ? (
        <Table Header={Header} data={data} Tr={Row} />
      ) : (
        <>No melting point data found.</>
      )}
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
        <LowHighUnits data={value?.data?.parsed} />
      </CompactTd>
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
