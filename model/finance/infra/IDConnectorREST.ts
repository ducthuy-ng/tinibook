import { Cashier, IDConnector, StorageManager } from '../domain/IDConnector';

import { InfraError, InvalidRole } from '../domain/Exceptions';

class IdConnectorREST implements IDConnector {
  urlIDServer = 'http://localhost:3000';

  async cashierFrom(id: number): Promise<Cashier> {
    const resp = await fetch(`${this.urlIDServer}/api/identity-access/employees/${id}`);
    if (resp.status != 200) throw new InfraError(null);

    const respBody = await resp.json();
    if (respBody['occupation'] !== 'STAFF') throw new InvalidRole(respBody['occupation']);

    return new Cashier(respBody['id'], respBody['name'], respBody['assigned_building']);
  }

  async storageManagerFrom(id: number): Promise<StorageManager> {
    const resp = await fetch(`${this.urlIDServer}/api/identity-access/employees/${id}`);
    if (resp.status != 200) throw new InfraError(null);

    const respBody = await resp.json();
    if (respBody['occupation'] !== 'STORAGE_MANAGER') throw new InvalidRole(respBody['occupation']);

    return new StorageManager(respBody['id'], respBody['name'], respBody['assigned_building']);
  }
}

export { IdConnectorREST };
