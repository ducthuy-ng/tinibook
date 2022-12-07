import { OrderedItem } from '../Receipt';

export interface BookPrice {
  [id: string]: number;
}

export interface StorageConnector {
  // getBookPrice(items: OrderedItem[]): Promise<BookPrice>;

  exportBooks(buildingId: string, orderItems: OrderedItem[]): Promise<void>;

  importBook(buildingId: string, orderItems: OrderedItem[]): Promise<void>;
}
