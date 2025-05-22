import { createTableColumnHelper, Table } from 'react-science/ui';

import Bp from '../Bp';
import ExternalLink from '../ExternalLink';

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
      <Table compact data={data} columns={columns} />
    </div>
  );
}
