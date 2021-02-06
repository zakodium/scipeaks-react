import { Compound } from 'pubchem';
import { useQuery } from 'react-query';

import LoadingFull from '@/components/LoadingFull';

import Full from './Full';

export default function Pubchem(props: { smiles: string }) {
  const { smiles } = props;
  const { isLoading, error, data } = useQuery(
    'pubchemSmilesLookup',
    async () => {
      const compound = await Compound.fromSmiles(smiles);
      const data = await compound.getData();
      return data;
    },
  );

  if (isLoading) {
    return <LoadingFull />;
  } else if (error) {
    throw error;
  }

  return <Full data={data} />;
}
