import { StorageService } from '../../../model/bookMngt/domain/services/StorageService';
import { InvalidBuildingLocation } from '../../../model/bookMngt/domain/exceptions';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendInternalErrorResponse, sendInvalidQueryResponse, sendSuccessResponse } from '../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return sendInvalidQueryResponse(res);

  if (!req.body['buildingId']) return sendInvalidQueryResponse(res);

  if (!Array.isArray(req.body['orders'])) return sendInvalidQueryResponse(res);

  const orders = req.body['orders'].slice(0);
  for (const item of orders) {
    if (!parseInt(item['amount'])) return sendInvalidQueryResponse(res);

    item['amount'] = parseInt(item['amount']);
  }

  try {
    await StorageService.importBook(req.body['buildingId'], orders);
  } catch (err) {
    if (err instanceof InvalidBuildingLocation) {
      return sendInvalidQueryResponse(res, 'invalid building type for export books');
    }
    console.error(`Failed to record Book export:`, err);
    return sendInternalErrorResponse(res);
  }

  sendSuccessResponse(res);
}
