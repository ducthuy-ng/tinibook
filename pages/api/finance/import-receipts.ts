import { NextApiRequest, NextApiResponse } from 'next';
import { OrderedItem } from '../../../model/finance/domain/Receipt';
import { InvalidRole } from '../../../model/finance/domain/Exceptions';
import { InvalidBuilding } from '../../../model/finance/domain/storage/Exceptions';
import { parseCookies } from 'nookies';
import {
  importReceiptService,
  sendInternalErrorResponse,
  sendInvalidCredentialResponse,
  sendNotFoundResponse,
  sendSuccessResponse,
  sendUnauthorizedResponse,
} from '../../../lib/api';
import { verify } from '../../../lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return CreateNewReceipt(req, res);

    default:
      return sendNotFoundResponse(res);
  }
}

async function CreateNewReceipt(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  if (!cookies['API_TOKEN']) return sendInvalidCredentialResponse(res);

  let token;
  try {
    token = verify(cookies['API_TOKEN']);
  } catch (e) {
    return sendInvalidCredentialResponse(res);
  }

  if (token.occupation != 'STORAGE_MANAGER') return sendInvalidCredentialResponse(res, 'Invalid role');

  try {
    await importReceiptService.createNewReceipt(token.employeeId, req.body['items'] as OrderedItem[]);
  } catch (err) {
    if (err instanceof InvalidRole || err instanceof InvalidBuilding) return sendUnauthorizedResponse(res);

    console.error(err);
    return sendInternalErrorResponse(res);
  }

  sendSuccessResponse(res);
}
