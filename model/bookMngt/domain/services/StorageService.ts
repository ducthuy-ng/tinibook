import { StorageItem, StoreItemRepo } from '../StorageItem';
import { InvalidBuildingLocation, StorageItemNotFound } from '../exceptions';
import { BuildingRepo, BuildingType } from '../Building';

type OrderItem = {
  bookId: string;
  amount: number;
};

export class StorageService {
  static storageRepo: StoreItemRepo;
  static buildingRepo: BuildingRepo;

  static async importBook(buildingId: string, items: OrderItem[]) {
    const building = await this.buildingRepo.getById(buildingId);
    if (building.type != BuildingType.WAREHOUSE) {
      throw new InvalidBuildingLocation(building.type);
    }

    const storageItemList: StorageItem[] = [];

    for (const item of items) {
      try {
        const existingStorageItem = await StorageService.storageRepo.getStorageItem(item.bookId, buildingId);
        existingStorageItem.addIn(item.amount);
        storageItemList.push(existingStorageItem);
      } catch (err) {
        if (err instanceof StorageItemNotFound) {
          const storageItem = new StorageItem(item.bookId, buildingId, item.amount);
          storageItemList.push(storageItem);
        }
      }
    }

    await this.storageRepo.saveAll(storageItemList);
  }

  static async exportBook(buildingId: string, orders: OrderItem[]) {
    const building = await this.buildingRepo.getById(buildingId);
    if (building.type != BuildingType.SHOP) {
      throw new InvalidBuildingLocation(building.type);
    }

    const storeItemList: StorageItem[] = [];
    for (const order of orders) {
      const existingStorageItem = await StorageService.storageRepo.getStorageItem(order.bookId, buildingId);
      existingStorageItem.takeOut(order.amount);
      storeItemList.push(existingStorageItem);
    }

    await this.storageRepo.saveAll(storeItemList);
  }

  static async transferBook(bookId: string, fromBuildingId: string, toBuildingId: string, amount: number) {
    const startStoreItem = await StorageService.storageRepo.getStorageItem(bookId, fromBuildingId);
    const destStoreItem = await StorageService.storageRepo.getStorageItem(bookId, toBuildingId);

    startStoreItem.takeOut(amount);
    destStoreItem.addIn(amount);

    await StorageService.storageRepo.saveAll([startStoreItem, destStoreItem]);
  }
}
