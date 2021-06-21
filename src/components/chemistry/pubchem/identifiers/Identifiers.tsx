import { ExternalLinkIcon } from '@heroicons/react/outline';
import { MF } from 'react-mf';
import { SmilesSvgRenderer } from 'react-ocl';

import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

export default function Identifiers(props: { identifiers: any; cid: any }) {
  const { identifiers, cid } = props;
  const rows: Array<any> = [];
  for (let key in identifiers) {
    if (key === 'formula') {
      rows.push({
        key: key,
        label: identifiers[key].label,
        value: <MF mf={identifiers[key].value} />,
        description: identifiers[key].description,
      });
    } else if (key === 'smiles') {
      rows.push({
        key: key,
        label: identifiers[key].label,
        value: identifiers[key].value,
        description: identifiers[key].description,
      });
      rows.push({
        key: 'structure',
        label: 'Structure',
        value: <SmilesSvgRenderer smiles={identifiers[key].value} />,
        description: '2D chemical structure derived from the SMILES.',
      });
    } else {
      rows.push({
        key: key,
        label: identifiers[key].label,
        value: identifiers[key].value,
        description: identifiers[key].description,
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
          {cid} <ExternalLinkIcon className="inline w-5 h-5" />
        </a>
      ),
      description: 'Unique identifer of a compound in the PubChem database.',
    });
  }
  return (
    <Table
      Header={Header}
      data={rows}
      Tr={Row}
      tableClassName="table-fixed w-1/2"
    />
  );
}

function Header() {
  return (
    <tr>
      <Th className="w-1/4">Label</Th>
      <Th>Value</Th>
      <Th>Description</Th>
    </tr>
  );
}

function Row(props: any) {
  const row = props.value;
  return (
    <tr key={row.key}>
      <CompactTd>{row.label}</CompactTd>
      <CompactTd>{row.value}</CompactTd>
      <CompactTd>{row.description}</CompactTd>
    </tr>
  );
}
