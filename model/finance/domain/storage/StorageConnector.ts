import { OrderedItem } from '../Receipt';

interface BookPrice {
  [id: string]: number;
}

interface StorageConnector {
  // getBookPrice(items: OrderedItem[]): Promise<BookPrice>;

  exportBooks(buildingId: string, orderItems: OrderedItem[]): Promise<void>;

  importBook(buildingId: string, orderItems: OrderedItem[]): Promise<void>;
}

export { BookPrice, StorageConnector };
