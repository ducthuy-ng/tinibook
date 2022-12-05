// /**
//  * A quick and dirty Query Processor
//  */
// import express from 'express';
// import { query } from './lib/postgres';
//
// const queryRouter = express.Router();
// const limitSize = 10;
//
// type SaleReceiptBrief = {
//   id: string;
//   createdDate: Date;
//   totalPrice: number;
//   createdCashierId: number;
// };
//
// type OrderedBook = {
//   isbn: string;
//   name: string;
//   price: number;
//   amount: number;
// };
//
// type SaleReceiptDetail = {
//   id: string;
//   createdDate: Date;
//   totalPrice: number;
//   createdCashierId: number;
//   orderedBooks: OrderedBook[];
// };
//
// query('CREATE OR REPLACE VIEW SaleReceiptBrief AS SELECT id, createddate, price, createdemployeeid FROM Sale_receipt');
//
// type OrderedBookPG = {
//   book_id: string;
//   amount: number;
// };
//
// async function getOrderedBookFromItems(items: string): Promise<OrderedBook[]> {
//   const bookRecords: OrderedBook[] = [];
//   const receiptItems: OrderedBookPG[] = JSON.parse(items);
//
//   for (const item of receiptItems) {
//     const result = await query('SELECT isbn, name, price FROM book WHERE id = $1', [item['book_id']]);
//
//     const record = result.rows[0];
//
//     bookRecords.push({
//       amount: item.amount,
//       isbn: record['isbn'],
//       name: record['name'],
//       price: record['price'],
//     });
//   }
//
//   return bookRecords;
// }
//
// queryRouter.get('/sale-receipts', async (req, res) => {
//   const pageNum = parseInt(String(req.query['page'])) || 1;
//   const offset = (pageNum - 1) * limitSize;
//
//   try {
//     const result = await query('SELECT * FROM SaleReceiptBrief LIMIT $1 OFFSET $2', [limitSize, offset]);
//     const receipts: SaleReceiptBrief[] = result.rows;
//
//     res.send(receipts);
//   } catch (e) {
//     res.sendStatus(500);
//     return;
//   }
// });
//
// queryRouter.get('/sale-receipt/:id', async (req, res) => {
//   const receiptId = req.params.id;
//   if (!receiptId) {
//     res.sendStatus(400);
//     return;
//   }
//
//   let receiptRecord: any;
//   try {
//     const result = await query('SELECT * FROM sale_receipt WHERE id=$1', [receiptId]);
//
//     if (result.rows.length != 1) {
//       res.sendStatus(404);
//       return;
//     }
//
//     receiptRecord = result.rows[0];
//   } catch (e) {
//     console.error(e);
//     res.sendStatus(500);
//     return;
//   }
//
//   let bookRecords: OrderedBook[];
//   try {
//     bookRecords = await getOrderedBookFromItems(receiptRecord['items']);
//   } catch (e) {
//     console.error(e);
//     res.sendStatus(500);
//     return;
//   }
//
//   const searchedReceipt: SaleReceiptDetail = {
//     id: receiptRecord['id'],
//     createdDate: receiptRecord['createddate'],
//     totalPrice: receiptRecord['price'],
//     createdCashierId: receiptRecord['createdemployeeid'],
//     orderedBooks: bookRecords,
//   };
//
//   res.send(searchedReceipt);
// });
//
// // =====================================================================================
//
// type ImportReceiptBrief = {
//   id: string;
//   createdDate: Date;
//   totalPrice: number;
//   createdCashierId: number;
// };
//
// type ImportReceiptDetail = {
//   id: string;
//   createdDate: Date;
//   totalPrice: number;
//   createdCashierId: number;
//   orderedBooks: OrderedBook[];
// };
//
// query(
//   'CREATE OR REPLACE VIEW import_receipt_brief AS SELECT id, createddate, cost, createdemployeeid FROM Import_receipt'
// );
//
// queryRouter.get('/import-receipts', async (req, res) => {
//   const pageNum = parseInt(String(req.query['page'])) || 1;
//   const offset = (pageNum - 1) * limitSize;
//
//   try {
//     const result = await query('SELECT * FROM import_receipt_brief LIMIT $1 OFFSET $2', [limitSize, offset]);
//     const receipts: ImportReceiptBrief[] = result.rows;
//
//     res.send(receipts);
//   } catch (e) {
//     res.sendStatus(500);
//     return;
//   }
// });
//
// queryRouter.get('/import-receipt/:id', async (req, res) => {
//   const receiptId = req.params.id;
//   if (!receiptId) {
//     res.sendStatus(400);
//     return;
//   }
//
//   let receiptRecord: any;
//   try {
//     const result = await query('SELECT * FROM import_receipt WHERE id=$1', [receiptId]);
//
//     if (result.rows.length != 1) {
//       res.sendStatus(404);
//       return;
//     }
//
//     receiptRecord = result.rows[0];
//   } catch (e) {
//     console.error(e);
//     res.sendStatus(500);
//     return;
//   }
//
//   let bookRecords: OrderedBook[];
//   try {
//     bookRecords = await getOrderedBookFromItems(receiptRecord['items']);
//   } catch (e) {
//     console.error(e);
//     res.sendStatus(500);
//     return;
//   }
//
//   const searchedReceipt: ImportReceiptDetail = {
//     id: receiptRecord['id'],
//     createdDate: receiptRecord['createddate'],
//     totalPrice: receiptRecord['price'],
//     createdCashierId: receiptRecord['createdemployeeid'],
//     orderedBooks: bookRecords,
//   };
//
//   res.send(searchedReceipt);
// });
//
// export { queryRouter };
