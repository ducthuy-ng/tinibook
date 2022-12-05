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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { isbn } = req.query;

  if (!isbn) return sendInvalidQueryResponse(res);

  if (Array.isArray(isbn)) isbn = isbn[0];

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
