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

function Row(value: any) {
  return (
    <tr key={value.code}>
      <CompactTd>{value.code}</CompactTd>
      <CompactTd>{value.description}</CompactTd>
    </tr>
  );
}

export default function HStatementsTable(props: any) {
  if (!props.hStatements || props.hStatements.length === 0) {
    return <>No hazard statements found.</>;
  } else {
    return (
      <Table
        renderHeader={renderHeader}
        data={props.hStatements}
        renderTr={Row}
        getId={getRowId}
      />
    );
  }
}

function getRowId(row: any) {
  return row.code;
}
