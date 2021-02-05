import { Table, Th, Td } from '../../../tailwind-ui';

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

export default function HStatementsTable(props: any) {
  return <Table Header={Header} data={props.hStatements} Tr={Row} />;
}
