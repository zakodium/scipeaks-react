import { createTableColumnHelper, Table } from 'react-science/ui';

import Bp from '../Bp.js';
import ExternalLink from '../ExternalLink.js';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('data.original', {
    header: 'Original value',
  }),
  columnHelper.accessor('data.parsed', {
    header: 'Parsed',
    cell: (row) => <Bp data={row.getValue()} />,
  }),
  columnHelper.accessor('reference', {
    header: 'Reference',
    cell: (row) => {
      const value = row.getValue();
      return <ExternalLink text={value.sourceName} url={value.url} />;
    },
  }),
];

export default function BpTable(props: { data: any }) {
  const { data } = props;
  if (!data) return 'No boiling point data found.';
  return (
    <div>
      <div className="pt-5 text-xl">Boiling point</div>
      <Table striped compact data={data} columns={columns} />
    </div>
  );
}
