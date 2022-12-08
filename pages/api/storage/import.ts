import { StorageService } from '../../../model/bookMngt/domain/services/StorageService';
import { InvalidBuildingLocation } from '../../../model/bookMngt/domain/exceptions';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendInternalErrorResponse, sendInvalidQueryResponse, sendSuccessResponse } from '../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return sendInvalidQueryResponse(res, 'Yêu cầu không hợp lệ');

  if (!req.body['buildingId']) return sendInvalidQueryResponse(res, 'Thiếu mã toà nhà');

  if (!Array.isArray(req.body['orders'])) return sendInvalidQueryResponse(res, 'Đơn hàng không hợp lệ');

  const orders = req.body['orders'].slice(0);
  for (const item of orders) {
    if (!parseInt(item['amount'])) return sendInvalidQueryResponse(res, 'Số lượng không hợp lệ');

    item['amount'] = parseInt(item['amount']);
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
