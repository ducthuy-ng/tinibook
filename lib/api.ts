import { NextApiResponse } from 'next';
import { EmployeeRepoPG } from '../model/identityaccess/employeeRepoPG';
import { AuthService } from '../model/identityaccess/authService';
import { BookRepoPG } from '../model/bookMngt/infra/BookRepoPG';
import { BookRepoPG as FinanceBookRepoPG } from '../model/finance/infra/BookRepoPG';
import { ImportReceiptService, SaleReceiptService } from '../model/finance/domain/ReceiptService';
import { ImportReceiptRepoPG, SaleReceiptRepoPG } from '../model/finance/infra/ReceiptRepoPG';
import { IdConnectorREST } from '../model/finance/infra/IDConnectorREST';
import { StorageConnectorRest } from '../model/finance/infra/StorageConnectorRest';
import { StorageService } from '../model/bookMngt/domain/services/StorageService';
import { BuildingRepoPG } from '../model/bookMngt/infra/BuildingRepoPG';
import { StoreItemRepoPG } from '../model/bookMngt/infra/StoreItemRepoPG';

if (!process.env.SIGN_KEY) {
  throw new Error('SIGN_KEY must be specified');
}
export const employeeRepo = new EmployeeRepoPG();
export const authService = new AuthService(employeeRepo, process.env.SIGN_KEY);

export const bookRepo = new BookRepoPG();
export const buildingRepo = new BuildingRepoPG();
export const storageRepo = new StoreItemRepoPG();
StorageService.buildingRepo = buildingRepo;
StorageService.storageRepo = storageRepo;

export const importReceiptRepo = new ImportReceiptRepoPG();
export const saleReceiptRepo = new SaleReceiptRepoPG();
export const idConnector = new IdConnectorREST();
export const storageConnector = new StorageConnectorRest();
export const financeBookRepo = new FinanceBookRepoPG();
export const importReceiptService = new ImportReceiptService(
  importReceiptRepo,
  idConnector,
  storageConnector,
  financeBookRepo
);
export const saleReceiptService = new SaleReceiptService(
  saleReceiptRepo,
  idConnector,
  storageConnector,
  financeBookRepo
);

export const sendSuccessResponse = (res: NextApiResponse, detail?: string) => {
  res.status(200).send({ message: 'Success', detail: detail });
};

export const sendCreatedResponse = (res: NextApiResponse, detail?: string) => {
  res.status(201).send({ message: 'Created', detail: detail });
};

/**
 * Send 400 error.
 * The return response should follow API Error Response convention
 * @param res
 * @param message
 * @param detail
 */
export const sendInvalidQueryResponse = (res: NextApiResponse, message?: string, detail?: string) => {
  res.status(400).send({ message: message || 'Invalid query params', detail: detail });
};

export const sendInvalidCredentialResponse = (res: NextApiResponse, detail?: string) => {
  res.status(401).send({ message: 'Invalid credential', detail: detail });
};

export const sendNotFoundResponse = (res: NextApiResponse) => {
  res.status(404).send({ message: 'Not Found' });
};

export const sendUnauthorizedResponse = (res: NextApiResponse, detail?: string) => {
  res.status(403).send({ message: 'Unauthorized', detail: detail });
};

export const sendInternalErrorResponse = (res: NextApiResponse) => {
  res.status(500).send({ message: 'Internal server error' });
};
