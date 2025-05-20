import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

import Pictogram from '../pictograms/Pictogram';

function renderHeader() {
  return (
    <tr>
      <Th>Code</Th>
      <Th>Pictogram</Th>
      <Th>Description</Th>
    </tr>
  );
}

function Row(row: any) {
  return (
    <tr>
      <CompactTd>{row.code}</CompactTd>
      <CompactTd>
        <Pictogram code={row.code} />
      </CompactTd>
      <CompactTd>{row.description}</CompactTd>
    </tr>
  );
}

export default function PictogramsTable(props: any) {
  if (!props.pictograms || props.pictograms.length < 1) {
    return <>No pictograms found.</>;
  } else {
    return (
      <Table
        renderHeader={renderHeader}
        data={props.pictograms}
        getId={getRowId}
        renderTr={Row}
      />
    );
  }
}

function getRowId(row: any) {
  return row.code;
}
