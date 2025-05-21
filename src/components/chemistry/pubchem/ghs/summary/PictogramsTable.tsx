import { createTableColumnHelper, Table } from 'react-science/ui';

import Pictogram from '../pictograms/Pictogram';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('code', {
    header: 'Code',
  }),
  columnHelper.accessor('code', {
    header: 'Pictogram',
    cell: (cell) => <Pictogram code={cell.getValue()} />,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
];

export default function PictogramsTable(props: any) {
  if (!props.pictograms || props.pictograms.length < 1) {
    return 'No pictograms found.';
  } else {
    return <Table compact data={props.pictograms} columns={columns} />;
  }
}
