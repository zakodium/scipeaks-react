import {
  SvgOutlineExternalLink,
  Table,
  Td,
  Th,
} from '@/components/tailwind-ui';

export default function OnePropertyTable(props: {
  data: any;
  parsedRenderer: any;
}) {
  const { data, parsedRenderer } = props;

  return <Table Header={Header} data={data} Tr={Row} />;

  function Row(props: any) {
    const value = props.value;
    return (
      <tr key={value.label}>
        <Td>{value.data.original}</Td>
        <Td>{parsedRenderer({ data: value?.data?.parsed })}</Td>
        <Td>
          <div>
            {value.reference.sourceName}{' '}
            <a href={value.reference.url} rel="noreferrer" target="_blank">
              <SvgOutlineExternalLink style={{ display: 'inline' }} />
            </a>
          </div>
        </Td>
      </tr>
    );
  }
}

function Header() {
  return (
    <tr>
      <Th>Original value</Th>
      <Th>Parsed</Th>
      <Th>Reference</Th>
    </tr>
  );
}
