import { ImportItem, StorageService } from '../../../model/bookMngt/domain/services/StorageService';
import { InvalidBuildingLocation } from '../../../model/bookMngt/domain/exceptions';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendInternalErrorResponse, sendInvalidQueryResponse, sendSuccessResponse } from '../../../lib/api';
import { OrderedItem } from '../../../model/finance/domain/Receipt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return sendInvalidQueryResponse(res, 'Yêu cầu không hợp lệ');

  if (!req.body['buildingId']) return sendInvalidQueryResponse(res, 'Thiếu mã toà nhà');

  if (!Array.isArray(req.body['orders'])) return sendInvalidQueryResponse(res, 'Đơn hàng không hợp lệ');

  const orders: ImportItem[] = [];
  for (const item of req.body['orders'] as Partial<OrderedItem>[]) {
    if (!item.book_id) return sendInvalidQueryResponse(res, 'Thông tin chi tiết không hợp lệ');

    const amount = parseInt(String(item.amount));
    if (!amount) return sendInvalidQueryResponse(res, 'Số lượng không hợp lệ');

    orders.push({ bookId: item.book_id, amount: amount });
  }

  try {
    await StorageService.importBook(req.body['buildingId'], orders);
  } catch (err) {
    if (err instanceof InvalidBuildingLocation) {
      return sendInvalidQueryResponse(res, 'Không thể nhập sách bên ngoài kho');
    }
    console.error(`Failed to record Book export:`, err);
    return sendInternalErrorResponse(res);
  }

  sendSuccessResponse(res);
}
