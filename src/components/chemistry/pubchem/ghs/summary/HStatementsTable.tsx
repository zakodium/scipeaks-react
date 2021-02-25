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

export default function HStatementsTable(props: any) {
  return <Table Header={Header} data={props.hStatements} Tr={Row} />;
}
