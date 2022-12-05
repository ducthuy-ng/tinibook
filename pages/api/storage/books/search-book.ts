import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../lib/postgres';
import { FuzzySearchResult } from '../../../../model/bookMngt/domain/Book';
import { sendInternalErrorResponse } from '../../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let bookName = req.query['book_name'] || '';
  if (req.query['maxPage']) return getMaxPage(req, res, bookName);

  let page = parseInt(String(req.query['page'])) || 1;
  let limit = parseInt(String(req.query['limit'])) || 10;

  try {
    const results = await query(
      `SELECT id, isbn, name, coverurl
       FROM book
       WHERE name ILIKE $1
       ORDER BY id
       LIMIT $2 OFFSET $3`,
      ['%' + bookName + '%', limit, (page - 1) * limit]
    );

    const parsedResult: FuzzySearchResult[] = results.rows.map(
      (item) =>
        <FuzzySearchResult>{
          id: item['id'],
          isbn: item['isbn'],
          name: item['name'],
          coverUrl: item['coverurl'],
        }
    );
    return res.send(parsedResult);
  } catch (err) {
    console.error(err);
    sendInternalErrorResponse(res);
  }
}

async function getMaxPage(req: NextApiRequest, res: NextApiResponse, bookName: string | string[]) {
  try {
    let results = await query(
      `SELECT COUNT(*)
       FROM book
       WHERE name ILIKE $1`,
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
