import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

function renderHeader() {
  return (
    <tr>
      <Th>Code</Th>
      <Th>Description</Th>
    </tr>
  );
}

function Row(row: any) {
  return (
    <tr key={row.code}>
      <CompactTd>{row.code}</CompactTd>
      <CompactTd>{row.description}</CompactTd>
    </tr>
  );
}

export default function PStatementsTable(props: any) {
  if (!props.pStatements || props.pStatements.length === 0) {
    return <>No precautionary statements found.</>;
  } else {
    return (
      <Table
        renderHeader={renderHeader}
        data={props.pStatements}
        renderTr={Row}
      />
    );
  }
}
