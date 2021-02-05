import { Table, Th, Td } from '../../../tailwind-ui';

import Pictogram from './pictograms/Pictogram';

function Header() {
  return (
    <tr>
      <Th>Code</Th>
      <Th>Pictogram</Th>
      <Th>Description</Th>
    </tr>
  );
}

function Row(props: any) {
  const row = props.value;
  return (
    <tr key={row.code}>
      <Td>{row.code}</Td>
      <Td>
        <Pictogram code={row.code} />
      </Td>
      <Td>{row.description}</Td>
    </tr>
  );
}

export default function PictogramsTable(props: any) {
  return <Table Header={Header} data={props.pictograms} Tr={Row} />;
}
