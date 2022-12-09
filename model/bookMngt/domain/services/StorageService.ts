import { StorageItem, StoreItemRepo } from '../StorageItem';
import { InvalidBuildingLocation, StorageItemNotFound } from '../exceptions';
import { BuildingRepo, BuildingType } from '../Building';

export interface ImportItem {
  bookId: string;
  amount: number;
}

export class StorageService {
  static storageRepo: StoreItemRepo;
  static buildingRepo: BuildingRepo;

  static async importBook(buildingId: string, items: ImportItem[]) {
    const building = await this.buildingRepo.getById(buildingId);
    if (building.type != BuildingType.WAREHOUSE) {
      throw new InvalidBuildingLocation(building.type);
    }

    const storageItemList: StorageItem[] = [];

    for (const item of items) {
      try {
        const existingStorageItem = await StorageService.storageRepo.getStorageItem(item.bookId, buildingId);
        console.log(existingStorageItem);
        existingStorageItem.addIn(item.amount);
        storageItemList.push(existingStorageItem);
      } catch (err) {
        if (err instanceof StorageItemNotFound) {
          console.log(item);
          const storageItem = new StorageItem(item.bookId, buildingId, item.amount);
          console.log(storageItem);
          storageItemList.push(storageItem);
        }
      }
    }

    await this.storageRepo.saveAll(storageItemList);
  }

  static async exportBook(buildingId: string, orders: ImportItem[]) {
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

    let destStoreItem;
    try {
      destStoreItem = await StorageService.storageRepo.getStorageItem(bookId, toBuildingId);
    } catch (e) {
      if (e instanceof StorageItemNotFound) {
        destStoreItem = new StorageItem(bookId, toBuildingId, 0);
      } else {
        throw e;
      }
    }

    startStoreItem.takeOut(amount);
    destStoreItem.addIn(amount);

    await StorageService.storageRepo.saveAll([startStoreItem, destStoreItem]);
  }
}
