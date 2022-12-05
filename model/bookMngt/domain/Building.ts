enum BuildingType {
  SHOP = 'SHOP',
  WAREHOUSE = 'WAREHOUSE',
}

class Building {
  public readonly id: string;

  public readonly name: string;
  public readonly address: string;

  type: BuildingType;

  constructor(id: string, name: string, address: string, type: BuildingType) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.type = type;
  }
}

interface BuildingRepo {
  getAll(): Promise<Array<Building>>;

  getById(id: string): Promise<Building>;

  // delete(building: Building): void;
}

export { Building, BuildingType, BuildingRepo };
