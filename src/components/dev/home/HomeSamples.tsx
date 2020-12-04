import clsx from 'clsx';
import React from 'react';

import { RocQueryResult, useRocQuery } from '../../../hooks/useRocQuery';
import { TocEntry } from '../../../types/db';
import { Spinner } from '../../tailwind-ui';

import { useHomeContext, useHomeDispatchContext } from './HomeContext';

export default function HomeSamples() {
  const { loading, error, result } = useRocQuery<TocEntry>('sample_toc');
  if (error) {
    throw error;
  }
  return (
    <div className="flex flex-col w-48 px-2 pt-4 border-r h-100 border-neutral-300">
      <h1 className="mb-4 text-lg font-bold text-center">Sample TOC</h1>
      <div className="flex-1">
        {loading || !result ? <Loading /> : <SampleToc samples={result} />}
      </div>
    </div>
  );
}

function SampleToc(props: { samples: RocQueryResult<TocEntry>[] }) {
  const { selectedSample } = useHomeContext();
  const dispatch = useHomeDispatchContext();
  function selectSample(id: string) {
    dispatch({ type: 'SELECT_SAMPLE', payload: id });
  }

  return (
    <div className="space-y-2">
      {props.samples.map((sample) => (
        <div
          key={sample.id}
          className={clsx(
            'p-1 border rounded cursor-pointer border-neutral-400',
            sample.id === selectedSample && 'bg-primary-50 shadow-inner',
          )}
          onClick={() => selectSample(sample.id)}
        >
          {sample.value.reference}
        </div>
      ))}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center mt-8">
      <Spinner className="w-8 h-8 text-primary-500" />
    </div>
  );
}
