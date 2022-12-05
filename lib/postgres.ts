import { Pool, QueryResultRow } from 'pg';
import { Employee } from '../model/identityaccess/domain/employee';

if (!process.env.CONNECTION_STRING) {
  throw new Error('CONNECTION_STRING must be specified');
}

const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });

async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

function explodeResultToEmployee(result: QueryResultRow): Employee {
  const { employeeid, employeename, ssn, email, phone, username, password, occupation, assigned_building } = result;
  return new Employee(employeeid, employeename, ssn, email, phone, username, password, occupation, assigned_building);
}

function releasePool() {
  return pool.end();
}

export { query, explodeResultToEmployee, releasePool };
