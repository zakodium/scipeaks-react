import { createTableColumnHelper, Table } from 'react-science/ui';

import ExternalLink from '../ExternalLink';
import Vp from '../Vp';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('data.original', {
    header: 'Original value',
  }),
  columnHelper.accessor('data.parsed', {
    header: 'Parsed',
    cell: (row) => <Vp data={row.getValue()} />,
  }),
  columnHelper.accessor('reference', {
    header: 'Reference',
    cell: (row) => {
      const value = row.getValue();
      return <ExternalLink text={value.sourceName} url={value.url} />;
    },
  }),
];

export default function VaporPressureTable(props: { data: any }) {
  const { data } = props;
  if (!data) return null;
  return (
    <div>
      <div className="pt-5 text-xl">Vapor pressure</div>
      <Table compact data={data} columns={columns} />
    </div>
  );
}
