import type { NextApiRequest, NextApiResponse } from 'next';

import fakeToc from './fakeToc.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(fakeToc);
}
