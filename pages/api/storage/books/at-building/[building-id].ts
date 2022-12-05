import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../../lib/postgres';
import { FuzzySearchResult } from '../../../../../model/bookMngt/domain/Book';
import { sendInternalErrorResponse, sendInvalidQueryResponse } from '../../../../../lib/api';

export interface SpecificLocationFuzzySearchResult extends FuzzySearchResult {
  amount: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query['building-id']) {
    sendInvalidQueryResponse(res);
  }
  const buildingId = req.query['building-id'];

  let bookName = req.query['book_name'] || '';
  if (req.query['maxPage']) return getMaxPage(req, res, bookName);

  let page = parseInt(String(req.query['page'])) || 1;
  let limit = parseInt(String(req.query['limit'])) || 10;

  try {
    const results = await query(
      `SELECT book_id, book_name, isbn, cover_url, amount
       FROM book_view
       WHERE book_name ILIKE $1
         AND building_id = $2
       ORDER BY book_id
       LIMIT $3 OFFSET $4`,
      ['%' + bookName + '%', buildingId, limit, (page - 1) * limit]
    );

    const parsedResult: FuzzySearchResult[] = results.rows.map(
      (item) =>
        <SpecificLocationFuzzySearchResult>{
          id: item['book_id'],
          isbn: item['isbn'],
          name: item['book_name'],
          coverUrl: item['cover_url'],
          amount: item['amount'],
        }
    );

    return res.send(parsedResult);
  } catch (err) {
    sendInternalErrorResponse(res);
  }
}

async function getMaxPage(req: NextApiRequest, res: NextApiResponse, bookName: string | string[]) {
  try {
    let results = await query(
      `SELECT COUNT(*)
       FROM book_view
       WHERE book_view.book_name ILIKE $1`,
      ['%' + bookName + '%']
    );

    const maxRecordNum = parseInt(results.rows[0]['count']);

    if (!maxRecordNum) return sendInternalErrorResponse(res);

    return res.send(maxRecordNum);
  } catch (e) {
    sendInternalErrorResponse(res);
    console.error(e);
  }
}
