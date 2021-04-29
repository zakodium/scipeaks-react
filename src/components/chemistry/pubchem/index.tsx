import { Compound } from 'pubchem';
import { useQuery } from 'react-query';

import LoadingFull from '@/components/LoadingFull';
import { ErrorPage } from '@/components/tailwind-ui';

import Panels from './Panels';

function PubchemChemError(props: { smiles: string }) {
  const { smiles } = props;
  return (
    <ErrorPage
      title="Pubchem query not successful."
      subtitle={`Maybe the SMILES string "${smiles}" you entered was invalid.`}
      hideImage
    />
  );
}

export default function Pubchem(props: { smiles: string }) {
  const { smiles } = props;
  const { isLoading, error, data } = useQuery(
    'pubchemSmilesLookup',
    async () => {
      const compound = await Compound.fromSmiles(smiles);
      const data = await compound.getData();
      if (typeof data.data !== 'object') {
        throw new Error('Failed to retrieve information');
      }
      return { compoundData: data, compound: compound };
    },
  );

  if (isLoading) {
    return <LoadingFull />;
  } else if (error) {
    return <PubchemChemError smiles={smiles} />;
  }

  return <Panels data={data} />;
}
