import { BookView, LocationView, StorageItem, StoreItemRepo } from '../domain/StorageItem';
import { InfrastructureErr, StorageItemNotFound } from '../domain/exceptions';
import { query } from '../../../lib/postgres';

class StoreItemRepoPG implements StoreItemRepo {
  async getAllOfBuilding(buildingId: string): Promise<Array<BookView>> {
    const results = await query('SELECT * FROM BookView WHERE buildingId = $1', [buildingId]);
    const parsedResults: BookView[] = [];
    results.rows.forEach((item) => {
      parsedResults.push(new BookView(item['bookid'], item['bookname'], item['buildingid'], item['amount']));
    });
    return parsedResults;
  }

  async getAllOfBook(bookId: string): Promise<Array<LocationView>> {
    const result = await query('SELECT * FROM LocationView WHERE bookId = $1', [bookId]);
    const parsedResults: LocationView[] = [];
    result.rows.forEach((item) => {
      parsedResults.push(new LocationView(item['bookid'], item['buildingid'], item['buildingname'], item['amount']));
    });
    return parsedResults;
  }

  async getStorageItem(bookId: string, buildingId: string): Promise<StorageItem> {
    const result = await query('SELECT * FROM StoreAt WHERE BookId = $1 AND BuildingId = $2', [bookId, buildingId]);

    if (result.rows.length != 1) {
      throw new StorageItemNotFound(bookId, buildingId);
    }

    const item = result.rows[0];
    return new StorageItem(item['bookid'], item['buildingid'], item['amount']);
  }

  async remove(storeItem: StorageItem): Promise<void> {
    try {
      await query(
        `DELETE
         FROM StoreAt
         WHERE bookid = $1
           AND buildingid = $2`,
        [storeItem.bookId, storeItem.buildingId]
      );
    } catch (e) {
      throw new InfrastructureErr(e);
    }
  }

  async save(storeItem: StorageItem): Promise<void> {
    try {
      await query(
        `INSERT INTO StoreAt
         VALUES ($1, $2, $3) ON CONFLICT (bookid, buildingid) DO
        UPDATE SET amount=$3;`,
        [storeItem.bookId, storeItem.buildingId, storeItem.amount]
      );
    } catch (e) {
      throw new InfrastructureErr(e);
    }
  }

  async saveAll(storeItemsList: Array<StorageItem>): Promise<void> {
    try {
      await query('BEGIN');
      for (const item of storeItemsList) {
        await query(
          `INSERT INTO StoreAt
           VALUES ($1, $2, $3) ON CONFLICT (bookid, buildingid) DO
          UPDATE SET amount=$3;`,
          [item.bookId, item.buildingId, item.amount]
        );
      }
      await query('COMMIT');
    } catch (err) {
      await query('ROLLBACK');
      throw new InfrastructureErr(err);
    }
  }
}

export { StoreItemRepoPG };
