import { Book, BookRepo, FuzzySearchResult } from '../domain/Book';
import { QueryResult } from 'pg';
import { BookNotFound, InfrastructureErr } from '../domain/exceptions';
import { query } from '../../../lib/postgres';

class BookRepoPG implements BookRepo {
  convertRawDBObjectToBook(obj: any): Book {
    return new Book(
      obj['id'],
      obj['isbn'],
      obj['name'],
      obj['type'],
      obj['author'],
      obj['coverurl'],
      obj['publisher'],
      obj['pagesNum'],
      obj['price']
    );
  }

  async fuzzySearch(bookName: string, limit: number, offset: number): Promise<Array<FuzzySearchResult>> {
    if (!limit) limit = 0;
    if (!offset) offset = 0;

    try {
      const results = await query(
        `SELECT id, name, coverurl
         FROM book
         WHERE name ILIKE $1
         LIMIT $2 OFFSET $3`,
        ['%' + bookName + '%', limit, offset]
      );

      const result: FuzzySearchResult[] = [];
      results.rows.forEach((item) => {
        result.push({ id: item['id'], isbn: item['isbn'], name: item['name'], coverUrl: item['coverurl'] });
      });
      return result;
    } catch (err) {
      throw new InfrastructureErr(err);
    }
  }

  async getAll(): Promise<Array<Book>> {
    try {
      const results = await query('SELECT * FROM book;');

      const books: Book[] = [];
      results.rows.forEach((item) => {
        books.push(Book.parseObject(item));
      });
      return books;
    } catch (err) {
      throw new InfrastructureErr(err);
    }
  }

  async getById(id: string): Promise<Book | null> {
    try {
      const results = await query(
        `SELECT *
         FROM book
         WHERE Id = $1;`,
        [id]
      );

      if (results.rows.length != 1) return null;
      return Book.parseObject(results.rows[0]);
    } catch (err) {
      throw new InfrastructureErr(err);
    }
  }

  async getByISBN(isbn: string): Promise<Book> {
    let result: QueryResult;
    try {
      result = await query(
        `SELECT *
         FROM book
         WHERE isbn = $1`,
        [isbn]
      );
    } catch (err) {
      console.error(err);
      throw new InfrastructureErr(err);
    }

    if (result.rows.length != 1) {
      throw new BookNotFound(isbn);
    }

    return this.convertRawDBObjectToBook(result.rows[0]);
  }

  async save(newBook: Book): Promise<void> {
    try {
      const arr_data = Object.entries(newBook).map((el) => el[1]);
      await query(
        `INSERT INTO book
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        arr_data
      );
    } catch (err) {
      throw new InfrastructureErr(err);
    }
  }

  async getPrices(id: string): Promise<number> {
    try {
      const result = await query(
        `SELECT price
         FROM book
         WHERE id = cast($1 as varchar);`,
        [id]
      );
      return result.rows[0]['price'];
    } catch (err) {
      throw new InfrastructureErr(err);
    }
  }
}

export { BookRepoPG };
