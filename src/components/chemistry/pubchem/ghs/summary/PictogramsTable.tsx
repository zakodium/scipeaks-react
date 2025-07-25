import { createTableColumnHelper, Table } from 'react-science/ui';

import Pictogram from '../pictograms/Pictogram.js';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('code', {
    header: 'Code',
  }),
  columnHelper.accessor('code', {
    id: 'pictogram',
    header: 'Pictogram',
    cell: (cell) => <Pictogram code={cell.getValue()} />,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
];

export default function PictogramsTable(props: any) {
  if (!props.pictograms || props.pictograms.length === 0) {
    return 'No pictograms found.';
  } else {
    return (
      <Table
        compact
        tableProps={{ style: { minWidth: '100%' } }}
        tdStyle={{ verticalAlign: 'middle' }}
        data={props.pictograms}
        columns={columns}
      />
    );
  }
}
