import { NextApiRequest, NextApiResponse } from 'next';
import { sendInternalErrorResponse, sendInvalidQueryResponse, sendNotFoundResponse } from '../../../../lib/api';
import { query } from '../../../../lib/postgres';

export interface CategorySale {
  book_type: string;
  quantity: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return statisticCategoryInMonth(req, res);
    default:
      return sendNotFoundResponse(res);
  }
}

async function statisticCategoryInMonth(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.year) return sendInvalidQueryResponse(res, 'Chưa khai báo năm', 'year must be specified');
  if (!req.query.month) return sendInvalidQueryResponse(res, 'Chưa khai báo tháng', 'month must be specified');

  try {
    const results = await query('SELECT * FROM category_statistic($1, $2)', [req.query.year, req.query.month]);
    const sales: CategorySale[] = results.rows.map((item) => {
      return {
        book_type: item['book_type'],
        quantity: parseInt(item['quantity']),
      };
    });

    res.send(sales);
  } catch (err) {
    console.error(err);
    return sendInternalErrorResponse(res);
  }
}
