import * as dotenv from 'dotenv';
import { ImportReceiptRepoPG, SaleReceiptRepoPG } from './ReceiptRepoPG';

dotenv.config();

describe('Test SaleReceiptRepoPG', () => {
  let repo: SaleReceiptRepoPG;

  beforeAll(() => {
    if (!process.env.CONNECTION_STRING) fail('Missing environment vars');
    repo = new SaleReceiptRepoPG(process.env.CONNECTION_STRING);
  });

  afterAll(() => {
    repo.stop();
  });

  test('getById', async () => {
    const result = await repo.getById('e0e4a4e9-5ad0-421c-a6fb-337c7b6c11fa');

    expect(result.createdDate).toEqual(new Date('2021-11-05 21:38:46'));
    expect(result.createdCashierId).toEqual(6);
  });
});

describe('Test ImportReceiptRepoPG', () => {
  let repo: ImportReceiptRepoPG;

  beforeAll(() => {
    if (!process.env.CONNECTION_STRING) fail('Missing environment vars');
    repo = new ImportReceiptRepoPG(process.env.CONNECTION_STRING);
  });

  afterAll(() => {
    repo.stop();
  });

  test('getById', async () => {
    const result = await repo.getById('2ce7f7d9-a9f5-4bb9-b043-91399bc60601');

    expect(result.createdDate).toEqual(new Date('2021-10-16 17:00:00'));
    expect(result.createdStockManagerId).toEqual(1);
  });
});
