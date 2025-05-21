import { MF } from 'react-mf';
import { SmilesSvgRenderer } from 'react-ocl';
import { createTableColumnHelper, Table } from 'react-science/ui';

import ExternalLink from '../ExternalLink';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('label', {
    // TODO(table): was "w-1/4" before
    header: 'Label',
  }),
  columnHelper.accessor('value', {
    header: 'value',
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
];

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
      description: 'Unique identifier of a compound in the PubChem database.',
    });
  }

  // TODO(table): was "table-fixed w-1/2" before
  return <Table compact data={rows} columns={columns} />;
}
