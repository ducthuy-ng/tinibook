import { ImportReceipt, ImportReceiptRepo, SaleReceipt, SaleReceiptRepo } from '../domain/Receipt';
import { InfraError, NotFound } from '../domain/Exceptions';
import { query } from '../../../lib/postgres';

class SaleReceiptRepoPG implements SaleReceiptRepo {
  async getById(id: string): Promise<SaleReceipt> {
    const result = await query('SELECT * FROM get_sale_receipt_by_id($1)', [id]);
    const receiptInfo = result.rows[0];

    if (!receiptInfo) throw new NotFound(id);

    return new SaleReceipt(
      receiptInfo['id'],
      receiptInfo['createddate'],
      JSON.parse(receiptInfo['items']),
      receiptInfo['price'],
      receiptInfo['createdemployeeid']
    );
  }

  async save(receipt: SaleReceipt): Promise<void> {
    try {
      await query(
        `INSERT INTO sale_receipt
             (id, createddate, createdemployeeid, price, items)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          receipt.id,
          receipt.createdDate,
          receipt.createdCashierId,
          receipt.totalPrice,
          JSON.stringify(receipt.orderedBooks),
        ]
      );
    } catch (e) {
      throw new InfraError(e);
    }
  }
}

class ImportReceiptRepoPG implements ImportReceiptRepo {
  async getById(id: string): Promise<ImportReceipt> {
    const result = await query('SELECT * FROM get_import_receipt_by_id($1)', [id]);
    const receiptInfo = result.rows[0];

    if (!receiptInfo) throw new NotFound(id);

    return new ImportReceipt(
      receiptInfo['id'],
      receiptInfo['createddate'],
      JSON.parse(receiptInfo['items']),
      receiptInfo['price'],
      receiptInfo['createdemployeeid']
    );
  }

  async save(receipt: ImportReceipt): Promise<void> {
    try {
      await query(
        `INSERT INTO import_receipt
         VALUES ($1, $2, $3, $4, $5)`,
        [
          receipt.id,
          receipt.createdDate,
          receipt.createdStockManagerId,
          receipt.totalCost,
          JSON.stringify(receipt.orderedBooks),
        ]
      );
    } catch (e) {
      throw new InfraError(e);
    }
  }
}

export { SaleReceiptRepoPG, ImportReceiptRepoPG };
