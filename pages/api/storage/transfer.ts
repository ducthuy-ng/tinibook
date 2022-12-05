import { StorageService } from '../../../model/bookMngt/domain/services/StorageService';
import { InvalidAmountTakeout } from '../../../model/bookMngt/domain/exceptions';

import { NextApiRequest, NextApiResponse } from 'next';
import { sendInternalErrorResponse, sendInvalidQueryResponse, sendSuccessResponse } from '../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return sendInvalidQueryResponse(res);

  if (!req.body['bookId']) return sendInvalidQueryResponse(res);

  if (!req.body['sourceBuildingId']) return sendInvalidQueryResponse(res);

  if (!req.body['destBuildingId']) return sendInvalidQueryResponse(res);

  const amount = parseInt(req.body['amount']);
  if (!amount) return sendInvalidQueryResponse(res);

  try {
    await StorageService.transferBook(
      req.body['bookId'],
      req.body['sourceBuildingId'],
      req.body['destBuildingId'],
      amount
    );
  } catch (err) {
    if (err instanceof InvalidAmountTakeout) {
      return sendInvalidQueryResponse(res, 'invalid amount take out');
    }
    console.error(`Failed to record Book export:`, err);
    return sendInternalErrorResponse(res);
  }

  sendSuccessResponse(res);
}
