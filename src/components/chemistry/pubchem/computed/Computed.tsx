import CompactTd from '@/components/common/CompactTd';
import { Table, Th } from '@/components/tailwind-ui';

export default function Computed(props: { computed: any }) {
  const { computed } = props;

  const rows: Array<any> = [];
  for (let key in computed) {
    rows.push({
      label: computed[key].label,
      value:
        computed[key].value +
        (computed[key].units ? ` ${computed[key].units}` : ''),
      reference: computed[key].reference.description,
      description: computed[key].description,
    });
  }

  return (
    <Table
      Header={Header}
      data={rows}
      Tr={Row}
      tableClassName="table-fixed"
      tableStyle={{ width: '50%' }}
    />
  );
}

function Header() {
  return (
    <tr>
      <Th className="w-1/4">Label </Th>
      <Th>Value</Th>
      <Th className="w-1/2">Description</Th>
      <Th>Reference</Th>
    </tr>
  );
}

function Row(props: any) {
  const row = props.value;
  return (
    <tr key={row.label}>
      <CompactTd style={{ whiteSpace: 'normal' }}>{row.label}</CompactTd>
      <CompactTd style={{ whiteSpace: 'normal' }}>{row.value}</CompactTd>
      <CompactTd style={{ whiteSpace: 'normal' }}>{row.description}</CompactTd>
      <CompactTd style={{ whiteSpace: 'normal' }}>{row.reference}</CompactTd>
    </tr>
  );
}
