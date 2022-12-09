import { NextApiRequest, NextApiResponse } from 'next';
import { OrderedItem } from '../../../../model/finance/domain/Receipt';
import { InfraError, InvalidRole } from '../../../../model/finance/domain/Exceptions';
import { InvalidBuilding } from '../../../../model/finance/domain/storage/Exceptions';
import {
  saleReceiptService,
  sendInternalErrorResponse,
  sendInvalidCredentialResponse,
  sendNotFoundResponse,
  sendSuccessResponse,
  sendUnauthorizedResponse,
} from '../../../../lib/api';
import { getToken } from '../../../../lib/jwt';
import { Occupation } from '../../../../model/identityaccess/domain/employee';
import { query } from '../../../../lib/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return CreateNewReceipt(req, res);
    case 'GET':
      return GetAllReceiptBrief(req, res);

    default:
      return sendNotFoundResponse(res);
  }
}

async function CreateNewReceipt(req: NextApiRequest, res: NextApiResponse) {
  const token = getToken({ req });
  if (!token) return sendInvalidCredentialResponse(res);

  if (token.occupation != Occupation.STAFF) return sendInvalidCredentialResponse(res, 'Invalid role');

  try {
    await saleReceiptService.createNewReceipt(token.employeeId, req.body['items'] as OrderedItem[]);
  } catch (err) {
    if (err instanceof InvalidRole || err instanceof InvalidBuilding) return sendUnauthorizedResponse(res);

    if (err instanceof InfraError) {
      console.error(err.message);
    }

    console.error(err);
    return sendInternalErrorResponse(res);
  }

  sendSuccessResponse(res);
}

export interface SaleReceiptBrief {
  id: string;
  createdDate: string;
  price: number;
}

async function GetAllReceiptBrief(req: NextApiRequest, res: NextApiResponse) {
  const token = getToken({ req });
  if (!token) return sendInvalidCredentialResponse(res);

  if (token.occupation != Occupation.SHOP_MANAGER && token.occupation != Occupation.ACCOUNTANT)
    return sendInvalidCredentialResponse(res, 'Invalid role');

  let page = parseInt(String(req.query['page'])) || 1;
  let limit = parseInt(String(req.query['limit'])) || 10;

  console.log(page);

  if (req.query['maxPage']) return getMaxPage(req, res, limit);

  try {
    const results = await query(
      `SELECT id, createddate, price
                                 FROM sale_receipt
                                 ORDER BY createddate DESC
                                 LIMIT $1 OFFSET $2`,
      [limit, (page - 1) * limit]
    );

    const parsedResults = results.rows.map(
      (receipt) =>
        <SaleReceiptBrief>{
          id: receipt['id'],
          createdDate: receipt['createddate'].toString(),
          price: receipt['price'],
        }
    );

    return res.send(parsedResults);
  } catch (err) {
    return sendInternalErrorResponse(res);
  }
}

async function getMaxPage(req: NextApiRequest, res: NextApiResponse, limit: number) {
  console.log('called');
  try {
    const results = await query(
      `SELECT COUNT(*)
                                 FROM sale_receipt`,
      []
    );

    const maxRecordNum = parseInt(results.rows[0]['count']);

    if (!maxRecordNum) return sendInternalErrorResponse(res);

    return res.send(Math.ceil(maxRecordNum / limit));
  } catch (e) {
    sendInternalErrorResponse(res);
    console.error(e);
  }
}
