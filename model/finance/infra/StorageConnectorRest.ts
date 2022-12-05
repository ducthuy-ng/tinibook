import { StorageConnector } from '../domain/storage/StorageConnector';
import { OrderedItem } from '../domain/Receipt';
import { InvalidBuilding } from '../domain/storage/Exceptions';
import { InfraError } from '../domain/Exceptions';

type storageOrderItem = {
  bookId: string;
  amount: number;
};

class StorageConnectorRest implements StorageConnector {
  urlStorageServer = 'http://localhost:3000';

  async exportBooks(buildingId: string, orderItems: OrderedItem[]): Promise<void> {
    const parsedOrderItems: storageOrderItem[] = [];
    for (const item of orderItems) {
      parsedOrderItems.push({ bookId: item.book_id, amount: item.amount });
    }

    const sendRequest = {
      buildingId: buildingId,
      orders: parsedOrderItems,
    };

    const resp = await fetch(`${this.urlStorageServer}/api/storage/export`, {
      method: 'POST',
      body: JSON.stringify(sendRequest),
      headers: { 'Content-Type': 'application/json' },
    });

    if (resp.status != 200) {
      console.error(await resp.json());
    }
  }

  async importBook(buildingId: string, orderItems: OrderedItem[]): Promise<void> {
    const sendRequest = {
      buildingId: buildingId,
      orders: orderItems,
    };

    const resp = await fetch(`${this.urlStorageServer}/api/storage/import`, {
      method: 'POST',
      body: JSON.stringify(sendRequest),
      headers: { 'Content-Type': 'application/json' },
    });

    switch (resp.status) {
      case 200:
        return;
      case 400: {
        const body = await resp.json();
        if (body.errorName && body === 'InvalidBuildingType') {
          throw new InvalidBuilding(buildingId);
        }

        throw new InfraError(body.error);
      }
      default: {
        const body = await resp.json();

        throw new InfraError(body.error);
      }
    }
  }
}

export { StorageConnectorRest };
