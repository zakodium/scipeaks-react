import { createTableColumnHelper, Table } from 'react-science/ui';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('label', {
    header: 'Label',
    meta: {
      thStyle: { width: '25%' },
    },
  }),
  columnHelper.accessor('value', {
    header: 'Value',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    meta: {
      thStyle: { width: '50%' },
    },
  }),
  columnHelper.accessor('reference', {
    header: 'Reference',
  }),
];

export default function Computed(props: { computed: any }) {
  const { computed } = props;

  const rows: any[] = [];
  for (const key in computed) {
    rows.push({
      key,
      label: computed[key].label,
      value:
        computed[key].value +
        (computed[key].units ? ` ${computed[key].units}` : ''),
      reference: computed[key].reference.description,
      description: computed[key].description,
    });
  }

  return (
    <Table
      compact
      className="w-1/2 table-fixed"
      data={rows}
      columns={columns}
    />
  );
}
