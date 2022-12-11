import { NextApiRequest, NextApiResponse } from 'next';
import { sendInternalErrorResponse, sendInvalidQueryResponse, sendNotFoundResponse } from '../../../../lib/api';
import { query } from '../../../../lib/postgres';

export interface SaleRecord {
  month: number;
  totalSale: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getRevenueInMonth(req, res);
    default:
      return sendNotFoundResponse(res);
  }
}

async function getRevenueInMonth(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.year) return sendInvalidQueryResponse(res, 'Chưa khai báo năm', 'year must be specified');

  try {
    const revenueList: SaleRecord[] = [];
    for (let month = 1; month <= 12; month++) {
      const result = await query('SELECT * FROM get_revenue_in_month($1, $2)', [req.query.year, month]);
      revenueList.push({ month: month, totalSale: parseFloat(result.rows[0]['revenue']) || 0 });
    }

    res.send(revenueList);
  } catch (err) {
    console.error(err);
    return sendInternalErrorResponse(res);
  }
}
