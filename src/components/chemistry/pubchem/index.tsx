import { useQuery } from '@tanstack/react-query';
import { Compound } from 'pubchem';

import ErrorPage from '@/components/error_page.js';
import LoadingFull from '@/components/loading_full.js';

import Panels from './Panels.js';

function PubchemChemError(props: { smiles: string }) {
  const { smiles } = props;
  return (
    <ErrorPage
      title="Pubchem query not successful."
      subtitle={`Maybe the SMILES string "${smiles}" you entered was invalid.`}
    />
  );
}

export default function Pubchem(props: { smiles: string }) {
  const { smiles } = props;
  const { isLoading, error, data } = useQuery({
    queryKey: ['chemistry/pubchem', 'pubchemSmilesLookup'],
    queryFn: async () => {
      const compound = await Compound.fromSmiles(smiles);
      const data = await compound.getData();
      if (typeof data.data !== 'object') {
        throw new Error('Failed to retrieve information');
      }
      return { compoundData: data, compound };
    },
  });

  if (isLoading) {
    return <LoadingFull />;
  } else if (error) {
    return <PubchemChemError smiles={smiles} />;
  }

  return <Panels data={data} />;
}
