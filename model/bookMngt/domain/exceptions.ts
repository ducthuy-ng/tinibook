import { BuildingType } from './Building';

class InvalidAmountTakeout implements Error {
  message: string;
  name = 'Invalid Amount Takeout';

  constructor(currentAmount: number, takeoutAmount: number) {
    this.message = `Cannot subtract ${takeoutAmount} more from ${currentAmount}`;
  }
}

class StorageItemNotFound implements Error {
  message: string;
  name = 'Storage Item Not Found';

  constructor(bookId: string, buildingId: string) {
    this.message = `Storage Item not found, bookId:${bookId}, buildingId:${buildingId}`;
  }
}

class InfrastructureErr<T> implements Error {
  message: string;
  name = 'Infrastructure Error';

  constructor(err: T) {
    if (err instanceof Error) this.message = `Infrastructure Error: ${err.message}`;
    else this.message = `Infrastructure Error: ${err}`;
  }
}

class BookNotFound implements Error {
  message: string;
  name = 'Book Not Found';

  constructor(searchQuery: string | null) {
    this.message = `Book not found by search query: ${searchQuery}`;
  }
}

class InvalidBuildingLocation implements Error {
  message: string;
  name = 'Invalid Building Location Error';

  constructor(buildingType: BuildingType) {
    this.message = `Invalid Building Location for this method: ${buildingType}`;
  }
}

export { InvalidAmountTakeout, InfrastructureErr, StorageItemNotFound, BookNotFound, InvalidBuildingLocation };
