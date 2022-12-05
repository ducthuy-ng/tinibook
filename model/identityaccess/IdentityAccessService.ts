import { Occupation } from './domain/employee';

export class IdentityAccessService {
  static async getAllOccupation(): Promise<string[]> {
    const occupationList = [];
    for (const occupation in Occupation) occupationList.push(occupation);

    return occupationList;
  }
}
