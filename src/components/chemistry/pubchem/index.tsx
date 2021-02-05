// @ts-ignore
import { Compound } from 'pubchem';
import { useQuery } from 'react-query';

import { useSearchParam } from '../../../hooks/searchParam';
import LoadingFull from '../../LoadingFull';
import { ErrorPage } from '../../tailwind-ui';

import Full from './Full';

export default function Pubchem(props) {
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
