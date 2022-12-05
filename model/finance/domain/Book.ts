type Book = {
  id: string;
  isbn: string;
  name: string;
  price: number;
};

/***
 * A read-only repo (as book are synchronized from 1 DB)
 */
interface BookRepo {
  getById(id: string): Promise<Book>;
}

export { Book, BookRepo };
