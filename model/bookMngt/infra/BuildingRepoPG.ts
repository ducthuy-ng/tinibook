import { Building, BuildingRepo } from '../domain/Building';
import { query } from '../../../lib/postgres';

class BuildingRepoPG implements BuildingRepo {
  async getAll(): Promise<Array<Building>> {
    const results = await query(
      `SELECT *
       FROM building;`,
      []
    );

    return results.rows.map((row) => new Building(row['buildingid'], row['name'], row['address'], row['buildingtype']));
  }

  async getById(id: string): Promise<Building> {
    const results = await query(
      `SELECT *
       FROM building
       WHERE buildingid = $1;`,
      [id]
    );

    const row = results.rows[0];
    return new Building(row['buildingid'], row['name'], row['address'], row['buildingtype']);
  }
}

export { BuildingRepoPG };
