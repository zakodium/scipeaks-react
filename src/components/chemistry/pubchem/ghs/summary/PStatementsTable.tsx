import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

function Header() {
  return (
    <tr>
      <Th>Code</Th>
      <Th>Description</Th>
    </tr>
  );
}

function Row(props: any) {
  const row = props.value;
  return (
    <tr key={row.code}>
      <CompactTd>{row.code}</CompactTd>
      <CompactTd>{row.description}</CompactTd>
    </tr>
  );
}

export default function PStatementsTable(props: any) {
  if (!props.pStatements || props.pStatements.length < 1) {
    return <>No precautionary statements found.</>;
  } else {
    return <Table Header={Header} data={props.pStatements} Tr={Row} />;
  }
}
