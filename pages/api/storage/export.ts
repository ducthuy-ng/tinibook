import { NextApiRequest, NextApiResponse } from 'next';
import { StorageService } from '../../../model/bookMngt/domain/services/StorageService';
import { InvalidAmountTakeout, InvalidBuildingLocation } from '../../../model/bookMngt/domain/exceptions';
import { sendInternalErrorResponse, sendInvalidQueryResponse, sendSuccessResponse } from '../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return sendInvalidQueryResponse(res, 'Body is missing');

  if (!req.body['buildingId']) return sendInvalidQueryResponse(res);

  if (!Array.isArray(req.body['orders'])) return sendInvalidQueryResponse(res);

  const orders = req.body['orders'].slice(0);
  for (const item of orders) {
    if (!parseInt(item['amount'])) return sendInvalidQueryResponse(res, 'Book amount is not a number');

    item['amount'] = parseInt(item['amount']);
  }

  try {
    await StorageService.exportBook(req.body['buildingId'], orders);
  } catch (err) {
    if (err instanceof InvalidAmountTakeout) {
      return sendInvalidQueryResponse(res, 'invalid amount take out');
    }

    if (err instanceof InvalidBuildingLocation) {
      return sendInvalidQueryResponse(res, 'invalid building type for export books');
    }

    console.error(`Failed to record Book export:`, err);
    return sendInternalErrorResponse(res);
  }

  sendSuccessResponse(res);
}
