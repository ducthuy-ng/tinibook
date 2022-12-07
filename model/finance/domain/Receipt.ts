import { randomUUID } from 'crypto';

export type OrderedItem = {
  book_id: string;
  amount: number;
};

export class SaleReceipt {
  id: string;
  createdDate: Date;
  orderedBooks: OrderedItem[];
  totalPrice: number;
  createdCashierId: number;

  constructor(
    id: string,
    createdDate: Date,
    orderedBooks: OrderedItem[],
    totalPrice: number,
    createdCashierId: number
  ) {
    this.id = id;
    this.createdDate = createdDate;
    this.orderedBooks = orderedBooks;
    this.totalPrice = totalPrice;
    this.createdCashierId = createdCashierId;
  }

  static generateNew(orderedBooks: OrderedItem[], price: number, createdCashierId: number): SaleReceipt {
    return new SaleReceipt(randomUUID(), new Date(), orderedBooks, price, createdCashierId);
  }
}

export interface SaleReceiptRepo {
  getById(id: string): Promise<SaleReceipt>;

  save(receipt: SaleReceipt): Promise<void>;
}

export class ImportReceipt {
  id: string;
  createdDate: Date;
  orderedBooks: OrderedItem[];
  totalCost: number;
  createdStockManagerId: number;

  constructor(
    id: string,
    createdDate: Date,
    orderedBooks: OrderedItem[],
    totalCost: number,
    createdStockManagerId: number
  ) {
    this.id = id;
    this.createdDate = createdDate;
    this.orderedBooks = orderedBooks;
    this.totalCost = totalCost;
    this.createdStockManagerId = createdStockManagerId;
  }

  static generateNew(orderedBooks: OrderedItem[], totalCost: number, createdStockManagerId: number): ImportReceipt {
    return new ImportReceipt(randomUUID(), new Date(), orderedBooks, totalCost, createdStockManagerId);
  }
}

export interface ImportReceiptRepo {
  getById(id: string): Promise<ImportReceipt>;

  save(receipt: ImportReceipt): Promise<void>;
}
