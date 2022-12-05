import { ImportReceipt, ImportReceiptRepo, OrderedItem, SaleReceipt, SaleReceiptRepo } from './Receipt';
import { IDConnector } from './IDConnector';
import { StorageConnector } from './storage/StorageConnector';
import { BookRepo } from './Book';

class SaleReceiptService {
  receiptRepo: SaleReceiptRepo;
  idConnector: IDConnector;
  storageConnector: StorageConnector;
  bookRepo: BookRepo;

  constructor(repo: SaleReceiptRepo, idConnector: IDConnector, storageConnector: StorageConnector, bookRepo: BookRepo) {
    this.receiptRepo = repo;
    this.idConnector = idConnector;
    this.storageConnector = storageConnector;
    this.bookRepo = bookRepo;
  }

  async createNewReceipt(cashierId: number, orderedBooks: OrderedItem[]) {
    const cashier = await this.idConnector.cashierFrom(cashierId);

    let price = 0;
    for (const orderedItem of orderedBooks) {
      const book = await this.bookRepo.getById(orderedItem.book_id);
      price += book.price * orderedItem.amount;
    }

    const newReceipt = SaleReceipt.generateNew(orderedBooks, price, cashier.id);

    await this.storageConnector.exportBooks(cashier.workingLocation, orderedBooks);
    await this.receiptRepo.save(newReceipt);
  }
}

class ImportReceiptService {
  receiptRepo: ImportReceiptRepo;
  idConnector: IDConnector;
  storageConnector: StorageConnector;
  bookRepo: BookRepo;

  constructor(
    repo: ImportReceiptRepo,
    idConnector: IDConnector,
    storageConnector: StorageConnector,
    bookRepo: BookRepo
  ) {
    this.receiptRepo = repo;
    this.idConnector = idConnector;
    this.storageConnector = storageConnector;
    this.bookRepo = bookRepo;
  }

  async createNewReceipt(storageManagerId: number, orderedBooks: OrderedItem[]) {
    const storageManager = await this.idConnector.storageManagerFrom(storageManagerId);

    let totalCost = 0;
    for (const orderedItem of orderedBooks) {
      const book = await this.bookRepo.getById(orderedItem.book_id);
      totalCost += book.price * orderedItem.amount;
    }

    const newReceipt = ImportReceipt.generateNew(orderedBooks, totalCost, storageManager.id);

    await this.storageConnector.importBook(storageManager.workingLocation, orderedBooks);
    await this.receiptRepo.save(newReceipt);
  }
}

export { SaleReceiptService, ImportReceiptService };
