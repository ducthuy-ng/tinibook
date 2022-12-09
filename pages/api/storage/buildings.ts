import { NextApiRequest, NextApiResponse } from 'next';
import { sendNotFoundResponse } from '../../../lib/api';
import { query } from '../../../lib/postgres';
import { Building } from '../../../model/bookMngt/domain/Building';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await getAllBuildings(req, res);
    default:
      return sendNotFoundResponse(res);
  }
}

async function getAllBuildings(req: NextApiRequest, res: NextApiResponse) {
  try {
    const results = await query('SELECT * FROM building');

    const parsedResult: Building[] = results.rows.map(
      (item) => new Building(item['buildingid'], item['name'], item['address'], item['buildingtype'])
    );
    res.send(parsedResult);
  } catch (e) {
    console.error(e);
  }
}
