import * as dotenv from 'dotenv';
import { BookRepoPG } from './BookRepoPG';
import { Book } from '../domain/Book';

dotenv.config();

describe('Test BookRepoPG', () => {
  let repo: BookRepoPG;

  beforeAll(() => {
    if (!process.env.CONNECTION_STRING) fail('Missing environment vars');
    repo = new BookRepoPG(process.env.CONNECTION_STRING);
  });

  afterAll(() => {
    repo.stop();
  });

  test('Get all book should have 199 value', () => {
    repo.getAll().then((books) => {
      expect(books).toHaveLength(199);
    });
  });

  test('Get valid ID should return Book type', () => {
    repo.getById('199').then((book) => {
      expect(book).not.toBeNull();
      expect(book).toBeInstanceOf(Book);
      if (book) expect(book.isbn).toEqual('1461843');
    });
  });

  test('Get invalid ID should return ull', () => {
    repo.getById('200').then((result) => expect(result).toBeNull());
  });

  test('Get by isbn simple', async () => {
    repo.getByISBN('7645846').then((book) => expect(book.id).toEqual('31'));
  });

  test('Fuzzy search should return', () => {
    repo.fuzzySearch('conan', 10, 0).then((results) => {
      expect(results.length > 0).toBeTruthy();
    });
  });
});
