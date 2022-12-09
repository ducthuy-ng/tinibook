import { NextApiRequest, NextApiResponse } from 'next';
import {
  sendInternalErrorResponse,
  sendInvalidQueryResponse,
  sendInvalidCredentialResponse,
  sendNotFoundResponse,
} from '../../../../lib/api';
import { getToken } from '../../../../lib/jwt';
import { query } from '../../../../lib/postgres';
import { Occupation } from '../../../../model/identityaccess/domain/employee';

export interface OrderedBook {
  isbn: string;
  name: string;
  price: number;
  amount: number;
  total: number;
}

export interface OrderedBookPG {
  book_id: string;
  amount: number;
}

export interface SaleReceiptDetail {
  id: string;
  createdDate: Date;
  totalPrice: number;
  createdCashierId: number;
  orderedBooks: OrderedBook[];
}

async function getOrderedBookFromItems(items: string): Promise<OrderedBook[]> {
  const bookRecords: OrderedBook[] = [];
  const receiptItems: OrderedBookPG[] = JSON.parse(items);

  for (const item of receiptItems) {
    const result = await query('SELECT isbn, name, price FROM book WHERE id = $1', [item['book_id']]);

    const record = result.rows[0];

    bookRecords.push({
      amount: item.amount,
      isbn: record['isbn'],
      name: record['name'],
      price: record['price'],
      total: item.amount * record['price'],
    });
  }

  return bookRecords;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getToken({ req });
  if (!token) return sendInvalidCredentialResponse(res);

  if (token.occupation != Occupation.SHOP_MANAGER && token.occupation != Occupation.ACCOUNTANT)
    return sendInvalidCredentialResponse(res, 'Invalid role');

  const receiptId = req.query.id;

  if (!receiptId) return sendInvalidQueryResponse(res, 'Invalid ID', receiptId);

  let receiptRecord: any;
  try {
    const result = await query('SELECT * FROM sale_receipt WHERE id=$1', [receiptId]);

    if (result.rows.length != 1) return sendNotFoundResponse(res);

    receiptRecord = result.rows[0];
  } catch (e) {
    return sendInternalErrorResponse(res);
  }

  let bookRecords: OrderedBook[];
  try {
    bookRecords = await getOrderedBookFromItems(receiptRecord['items']);
  } catch (e) {
    return sendInternalErrorResponse(res);
  }

  const searchedReceipt: SaleReceiptDetail = {
    id: receiptRecord['id'],
    createdDate: receiptRecord['createddate'],
    totalPrice: receiptRecord['price'],
    createdCashierId: receiptRecord['createdemployeeid'],
    orderedBooks: bookRecords,
  };

  res.send(searchedReceipt);
}
