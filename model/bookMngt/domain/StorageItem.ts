import { InvalidAmountTakeout } from './exceptions';

export class StorageItem {
  public readonly bookId: string;
  public readonly buildingId: string;
  public amount: number;

  constructor(bookId: string, buildingId: string, amount: number) {
    this.bookId = bookId;

    this.buildingId = buildingId;

    this.amount = amount;
  }

  takeOut(amount: number) {
    if (amount > this.amount) throw new InvalidAmountTakeout(this.amount, amount);

    this.amount -= amount;
  }

  addIn(amount: number) {
    this.amount += amount;
  }
}

export class LocationView {
  bookId: string;
  buildingId: string;
  buildingName: string;
  amount: number;

  constructor(bookId: string, buildingId: string, buildingName: string, amount: number) {
    this.bookId = bookId;
    this.buildingId = buildingId;
    this.buildingName = buildingName;
    this.amount = amount;
  }
}

export class BookView {
  bookId: string;
  bookName: string;
  buildingId: string;
  amount: number;

  constructor(bookId: string, bookName: string, buildingId: string, amount: number) {
    this.bookId = bookId;
    this.bookName = bookName;
    this.buildingId = buildingId;
    this.amount = amount;
  }
}

export interface StoreItemRepo {
  getAllOfBook(bookId: string): Promise<Array<LocationView>>;

  getAllOfBuilding(buildingId: string): Promise<Array<BookView>>;

  getStorageItem(bookId: string, buildingId: string): Promise<StorageItem>;

  save(storeItem: StorageItem): Promise<void>;

  saveAll(storeItemsList: Array<StorageItem>): Promise<void>;

  remove(storeItem: StorageItem): Promise<void>;
}
