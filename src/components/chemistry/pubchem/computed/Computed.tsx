import { createTableColumnHelper, Table } from 'react-science/ui';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('label', {
    // TODO(table): was "w-1/4" before
    header: 'Label',
  }),
  columnHelper.accessor('value', {
    header: 'Value',
  }),
  columnHelper.accessor('description', {
    // TODO(table): was "w-1/2" before
    header: 'Description',
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

  // TODO(table): was "table-fixed w-1/2" before
  return <Table compact data={rows} columns={columns} />;
}
