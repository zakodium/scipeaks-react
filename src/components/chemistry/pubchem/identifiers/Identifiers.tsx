import { MF } from 'react-mf';

import CompactTd from '@/components/common/CompactTd';
import { Table, Th, SvgOutlineExternalLink } from '@/components/tailwind-ui';

export default function Identifiers(props: { identifiers: any; cid: any }) {
  const { identifiers, cid } = props;
  const rows: Array<any> = [];
  for (let key in identifiers) {
    if (key === 'formula') {
      rows.push({
        key: key,
        label: key,
        value: <MF mf={identifiers[key]} />,
      });
    } else {
      rows.push({
        key: key,
        label: key,
        value: identifiers[key],
      });
    }
  }

  if (cid) {
    rows.push({
      key: 'cid',
      label: 'Pubchem compound ID (CID)',
      value: (
        <a
          href={`https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`}
          target="_blank"
          rel="noreferrer"
        >
          {cid} <SvgOutlineExternalLink style={{ display: 'inline' }} />
        </a>
      ),
    });
  }
  return (
    <div>
      <Table
        Header={Header}
        data={rows}
        Tr={Row}
        tableClassName="table-fixed w-1/2"
      />
      <p>
        You can use the identifiers to verify that we retrieved the information
        for the correct compound.
      </p>
    </div>
  );
}

function Header() {
  return (
    <tr>
      <Th className="w-1/4">Label</Th>
      <Th>Value</Th>
    </tr>
  );
}

function Row(props: any) {
  const row = props.value;
  return (
    <tr key={row.key}>
      <CompactTd>{row.label}</CompactTd>
      <CompactTd>{row.value}</CompactTd>
    </tr>
  );
}
