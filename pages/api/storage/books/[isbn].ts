import { NextApiRequest, NextApiResponse } from 'next';
import { BookNotFound } from '../../../../model/bookMngt/domain/exceptions';
import {
  bookRepo,
  sendInternalErrorResponse,
  sendInvalidQueryResponse,
  sendNotFoundResponse,
  storageRepo,
} from '../../../../lib/api';
import { LocationView } from '../../../../model/bookMngt/domain/StorageItem';
import { Book } from '../../../../model/bookMngt/domain/Book';

export type BookSearchType = Book & { location: LocationView[] };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { isbn } = req.query;

  if (!isbn) return sendInvalidQueryResponse(res, 'Thiếu mã số sách');

  if (Array.isArray(isbn)) isbn = isbn[0];

  switch (req.method) {
    case 'GET':
      return getBook(isbn, req, res);
    default:
      return sendNotFoundResponse(res);
  }
}

async function getBook(isbn: string, req: NextApiRequest, res: NextApiResponse) {
  let showLocation = !!req.query['show_location'];

  try {
    const searchedBook = await bookRepo.getByISBN(isbn);

    let bookLocation: LocationView[] = [];
    if (showLocation) {
      bookLocation = await storageRepo.getAllOfBook(searchedBook.id);
    }

    let parsedResult = Object.assign({}, searchedBook, { location: bookLocation });

    res.send(parsedResult);
  } catch (err) {
    if (err instanceof BookNotFound) {
      return sendNotFoundResponse(res);
    }

    console.error(err);
    return sendInternalErrorResponse(res);
  }
}
