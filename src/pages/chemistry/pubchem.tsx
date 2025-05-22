import Head from 'next/head';

import Pubchem from '@/components/chemistry/pubchem';
import ErrorPage from '@/components/error_page';
import { useSearchParam } from '@/hooks/searchParam';

export default function PubchemPage() {
  const smiles = useSearchParam('smiles');
  if (!smiles) {
    return (
      <ErrorPage
        title="SMILES missing"
        subtitle="You need to provide a SMILES"
      />
    );
  }
  return (
    <>
      <Head>
        <title>Pubchem experimental data lookup</title>
      </Head>
      <Pubchem smiles={smiles} />
    </>
  );
}
