import { createTableColumnHelper, Table } from 'react-science/ui';

import ExternalLink from '../ExternalLink';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('data.original', {
    meta: {
      thStyle: { width: '75%' },
    },
    header: 'Original value',
  }),
  columnHelper.accessor('reference', {
    header: 'Reference',
    cell: (row) => {
      const value = row.getValue();
      return <ExternalLink text={value.sourceName} url={value.url} />;
    },
  }),
];

export default function SolubilityTable(props: { data: any }) {
  const { data } = props;
  if (!data) return 'No solubility data found.';
  return (
    <div>
      <div className="pt-5 text-xl">Solubility</div>
      <Table striped compact data={data} columns={columns} />
    </div>
  );
}
