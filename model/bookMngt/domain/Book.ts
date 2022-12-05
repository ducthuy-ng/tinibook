import { randomUUID } from 'crypto';

class Book {
  public readonly id: string;
  public readonly isbn: string;
  public readonly name: string;
  public type: string;
  public author: string;
  public coverUrl: string;
  public publisher: string;
  public pagesNum: number;
  public price: number;

  constructor(
    id: string,
    isbn: string,
    name: string,
    type: string,
    author: string,
    coverUrl: string,
    publisher: string,
    pagesNum: number,
    price: number
  ) {
    this.id = id;
    this.isbn = isbn;
    this.name = name;
    this.type = type;
    this.author = author;
    this.coverUrl = coverUrl;
    this.publisher = publisher;
    this.pagesNum = pagesNum;
    this.price = price;
  }

  static newBook(
    isbn: string,
    name: string,
    type: string,
    author: string,
    coverUrl: string,
    publisher: string,
    pagesNum: number,
    price: number
  ): Book {
    return new Book(randomUUID(), isbn, name, type, author, coverUrl, publisher, pagesNum, price);
  }

  static parseObject(obj: Required<Book>) {
    return new Book(
      obj.id,
      obj.isbn,
      obj.name,
      obj.type,
      obj.author,
      obj.coverUrl,
      obj.publisher,
      obj.pagesNum,
      obj.price
    );
  }
}

interface FuzzySearchResult {
  id: string;
  isbn: string;
  name: string;
  coverUrl: string;
}

interface BookPrice {
  id: string;
  price: number;
}

interface BookRepo {
  getAll(): Promise<Array<Book>>;

  getById(id: string): Promise<Book | null>;

  getByISBN(isbn: string): Promise<Book | null>;

  getPrices(idx: string): Promise<number>;

  fuzzySearch(bookName: string, limit?: number, offset?: number): Promise<Array<FuzzySearchResult>>;

  save(newBook: Book): void;
}

export { Book };
export type { BookRepo, FuzzySearchResult, BookPrice };
