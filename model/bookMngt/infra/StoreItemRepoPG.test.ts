import * as dotenv from 'dotenv';

import { StoreItemRepoPG } from './StoreItemRepoPG';

dotenv.config();

describe('Test BookRepoPG', () => {
  let repo: StoreItemRepoPG;

  beforeAll(() => {
    if (!process.env.CONNECTION_STRING) fail('Missing environment vars');
    repo = new StoreItemRepoPG(process.env.CONNECTION_STRING);
  });

  afterAll(() => {
    repo.stop();
  });

  test('Test getAllOfBook', async () => {
    const result = await repo.getAllOfBook('49');
    result.every((item) => {
      expect(item.bookId).toEqual('49');
    });
  });

  test('Test getAllOfBuilding', async () => {
    const result = await repo.getAllOfBuilding('3');
    result.every((item) => {
      expect(item.buildingId).toEqual('3');
    });
  });

  test('Test getStorageItem', async () => {
    const item = await repo.getStorageItem('122', '3');
    expect(item.amount).toEqual(8);
  });
});
