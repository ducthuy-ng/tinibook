import { destroyCookie } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  destroyCookie({ res }, 'API_TOKEN', { path: '/' });
  res.send({});
}
