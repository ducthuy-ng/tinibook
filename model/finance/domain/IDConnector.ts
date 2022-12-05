class Cashier {
  id: number;
  name: string;
  workingLocation: string;

  constructor(id: number, name: string, workingLocation: string) {
    this.id = id;
    this.name = name;
    this.workingLocation = workingLocation;
  }
}

class StorageManager {
  id: number;
  name: string;
  workingLocation: string;

  constructor(id: number, name: string, workingLocation: string) {
    this.id = id;
    this.name = name;
    this.workingLocation = workingLocation;
  }
}

export { Cashier, StorageManager };

export interface IDConnector {
  cashierFrom(id: number): Promise<Cashier>;

  storageManagerFrom(id: number): Promise<StorageManager>;
}
