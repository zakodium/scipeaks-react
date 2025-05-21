import { createTableColumnHelper, Table } from 'react-science/ui';

const columnHelper = createTableColumnHelper<any>();
const columns = [
  columnHelper.accessor('code', {
    header: 'Code',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
];

export default function HStatementsTable(props: any) {
  if (!props.hStatements || props.hStatements.length === 0) {
    return 'No hazard statements found.';
  } else {
    return <Table compact data={props.hStatements} columns={columns} />;
  }
}
