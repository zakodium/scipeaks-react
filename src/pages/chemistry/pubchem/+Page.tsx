import Pubchem from '@/components/chemistry/pubchem/index.js';
import ErrorPage from '@/components/error_page.js';
import { useSearchParam } from '@/hooks/searchParam.js';

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
  return <Pubchem smiles={smiles} />;
}
