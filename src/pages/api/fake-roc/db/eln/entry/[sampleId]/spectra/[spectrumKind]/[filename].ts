import { readFile } from 'fs/promises';
import { resolve } from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { sampleId, spectrumKind, filename } = req.query;

  try {
    const attachment = await readFile(
      resolve(
        'src/pages/api/fake-roc/db/eln/entry/_samples',
        sampleId as string,
        'spectra',
        spectrumKind as string,
        filename as string,
      ),
    );
    return res.status(200).end(attachment);
  } catch (e) {
    if (e.code === 'ENOENT') {
      res.status(404).json({
        error: 'document not found',
        code: 'not found',
      });
    }
    throw e;
  }
}
