import { Book, BookRepo } from '../domain/Book';

import { InfraError, NotFound } from '../domain/Exceptions';
import { query } from '../../../lib/postgres';

class BookRepoPG implements BookRepo {
  async getById(id: string): Promise<Book> {
    let results;
    try {
      results = await query('SELECT id, isbn, name, price FROM book WHERE id = $1', [id]);
    } catch (e) {
      throw new InfraError(e);
    }

    if (results.rows.length != 1) {
      throw new NotFound(id);
    }

    return results.rows[0];
  }
}

export { BookRepoPG };
