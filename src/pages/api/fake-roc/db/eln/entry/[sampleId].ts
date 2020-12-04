// eslint-disable-next-line import/no-unresolved
import { readFile } from 'fs/promises';
import { resolve } from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

const validSampleId = /^[a-f0-9]{32}$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sampleId = req.query.sampleId as string;

  if (!validSampleId.test(sampleId)) {
    return notFound(res);
  }

  try {
    const sampleData = await readFile(
      resolve(
        'src/pages/api/fake-roc/db/eln/entry/_samples',
        sampleId,
        'sample.json',
      ),
    );
    return res.status(200).end(sampleData);
  } catch (e) {
    if (e.code === 'ENOENT') {
      return notFound(res);
    }
    throw e;
  }
}

function notFound(res: NextApiResponse) {
  return res.status(404).json({
    error: 'document not found',
    code: 'not found',
  });
}
