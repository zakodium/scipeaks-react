import { MF } from 'react-mf';
import { SmilesSvgRenderer } from 'react-ocl';

import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

import ExternalLink from '../ExternalLink';

export default function Identifiers(props: { identifiers: any; cid: any }) {
  const { identifiers, cid } = props;
  const rows: any[] = [];
  for (const key in identifiers) {
    if (key === 'formula') {
      rows.push({
        key,
        label: identifiers[key].label,
        value: <MF mf={identifiers[key].value} />,
        description: identifiers[key].description,
      });
    } else if (key === 'smiles') {
      rows.push({
        key,
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
        key,
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
        <ExternalLink
          text={cid}
          url={`https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`}
        />
      ),
      description: 'Unique identifer of a compound in the PubChem database.',
    });
  }
  return (
    <Table
      renderHeader={renderHeader}
      data={rows}
      renderTr={Row}
      tableClassName="table-fixed w-1/2"
    />
  );
}

function renderHeader() {
  return (
    <tr>
      <Th className="w-1/4">Label</Th>
      <Th>Value</Th>
      <Th>Description</Th>
    </tr>
  );
}

function Row(row: any) {
  return (
    <tr key={row.key}>
      <CompactTd>{row.label}</CompactTd>
      <CompactTd>{row.value}</CompactTd>
      <CompactTd>{row.description}</CompactTd>
    </tr>
  );
}
