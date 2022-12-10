import { NextApiRequest, NextApiResponse } from 'next';
import {
  bookRepo,
  sendInternalErrorResponse,
  sendInvalidQueryResponse,
  sendNotFoundResponse,
  sendSuccessResponse,
} from '../../../../lib/api';
import { Book } from '../../../../model/bookMngt/domain/Book';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return addBook(req, res);

    default:
      return sendNotFoundResponse(res);
  }
}

async function addBook(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body['isbn'] || !req.body['name'] || !req.body['type'] || !req.body['author']) {
    return sendInvalidQueryResponse(res, 'Yêu cầu không hợp lệ', 'Request body is missing some required properties');
  }

  const price = parseInt(req.body['price']);
  if (!price) {
    return sendInvalidQueryResponse(res, 'Giá tiền không hợp lệ', 'Price must be a number');
  }

  const pagesNum = parseInt(req.body['pagesNum']);
  if (!pagesNum) {
    return sendInvalidQueryResponse(res, 'Số trang sách không hợp lệ', 'Page num must be a number');
  }

  let newBook = Book.newBook(
    req.body['isbn'],
    req.body['name'],
    req.body['type'],
    req.body['author'],
    req.body['coverUrl'],
    req.body['publisher'],
    pagesNum,
    price
  );

  try {
    await bookRepo.save(newBook);
    return sendSuccessResponse(res);
  } catch (e) {
    console.error(e);
    return sendInternalErrorResponse(res);
  }
}
