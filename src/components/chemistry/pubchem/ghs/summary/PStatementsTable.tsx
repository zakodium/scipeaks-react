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

export default function PStatementsTable(props: any) {
  if (!props.pStatements || props.pStatements.length === 0) {
    return 'No precautionary statements found.';
  } else {
    return <Table striped data={props.pStatements} columns={columns} />;
  }
}
