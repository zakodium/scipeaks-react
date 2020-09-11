import { useEffect, useState } from 'react';
import { RocDocument } from 'rest-on-couch-client';

import { useRoc } from '../contexts/roc';

export function useSample(
  uuid: string,
): { loading: true } | { loading: false; sample: RocDocument } {
  const { roc } = useRoc();
  const [sample, setSample] = useState<RocDocument | null>(null);
  useEffect(() => {
    const doc = roc.getDocument(uuid);
    doc
      .fetch()
      .then(() => setSample(doc))
      .catch((e) => {
        alert(`ERROR: ${e.message}`);
      });
  }, [roc, uuid]);

  if (sample) {
    return { loading: false, sample };
  } else {
    return { loading: true };
  }
}
