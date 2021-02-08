import { CompactTable, Td, Th } from '../../CompactTable';

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
      <Td>{row.code}</Td>
      <Td>{row.description}</Td>
    </tr>
  );
}

export default function PStatementsTable(props: any) {
  return <CompactTable Header={Header} data={props.pStatements} Tr={Row} />;
}
