import { createTableColumnHelper, Table } from 'react-science/ui';

import ExternalLink from '../ExternalLink.js';
import LowHighUnits from '../LowHighUnits.js';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('data.original', {
    header: 'Original value',
  }),
  columnHelper.accessor('data.parsed', {
    header: 'Parsed',
    cell: (row) => <LowHighUnits data={row.getValue()} />,
  }),
  columnHelper.accessor('reference', {
    header: 'Reference',
    cell: (row) => {
      const value = row.getValue();
      return <ExternalLink text={value.sourceName} url={value.url} />;
    },
  }),
];

export default function FlashPointTable(props: { data: any }) {
  const { data } = props;
  if (!data) return 'No flash point data found.';
  return (
    <div>
      <div className="pt-5 text-xl">Flash point</div>
      <Table striped compact data={data} columns={columns} />
    </div>
  );
}
