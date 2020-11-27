import React from 'react';

import { Alert, AlertType, Table, useTable } from '../components/tailwind-ui';
import { MainSampleProvider, useMainSample } from '../contexts/mainSample';
import { useRocQuery } from '../hooks/useRocQuery';

export default function Index() {
  const toc = useRocQuery('sample_toc');

  if (toc.loading) {
    return <div>loading toc...</div>;
  }
  if (toc.error) {
    return <Alert title="Error loading toc" type={AlertType.ERROR} />;
  }
  if (!toc.result) return null;

  return (
    <div className="flex">
      <div>
        <TocTable toc={toc.result} />
      </div>
      <div>
        <MainSampleProvider uuid="6a6bb043cc1fb7ab0f7a9db4d0995728">
          <Sample />
        </MainSampleProvider>
      </div>
    </div>
  );
}

function Sample() {
  const sample = useMainSample();

  return <div>{sample.getValue().$id}</div>;
}

function TocTable(props: { toc: any[] }) {
  const table = useTable(props.toc, {});
  return <Table Header={Header} Tr={Tr} {...table} />;
}

function Header() {
  return (
    <th>
      <td>Reference</td>
    </th>
  );
}

function Tr(props: { value: any }) {
  return (
    <tr>
      <td>{props.value.value.reference}</td>
    </tr>
  );
}
