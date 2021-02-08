import { SvgOutlineExternalLink } from '@/components/tailwind-ui';

import { CompactTable, Td, Th } from '../CompactTable';
import Vp from '../Vp';

export default function VaporPressureTable(props: { data: any }) {
  const { data } = props;
  if (!data) return <></>;
  return (
    <div>
      <div className="text-xl pt-5">Vapor pressure</div>
      <CompactTable Header={Header} data={data} Tr={Row} />
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
      <Td>{value.data.original}</Td>
      <Td>
        <Vp data={value?.data?.parsed} />
      </Td>
      <Td>
        <div>
          {value.reference.sourceName}{' '}
          <a href={value.reference.url} rel="noreferrer" target="_blank">
            <SvgOutlineExternalLink style={{ display: 'inline' }} />
          </a>
        </div>
      </Td>
    </tr>
  );
}
