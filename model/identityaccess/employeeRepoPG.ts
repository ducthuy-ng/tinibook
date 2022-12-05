import { QueryResult, QueryResultRow } from 'pg';
import { Employee, EmployeeRepo } from './domain/employee';
import { NotFound, PGConnectionError } from './domain/exceptions';
import { query } from '../../lib/postgres';

class EmployeeRepoPG implements EmployeeRepo {
  static explodeResultToEmployee(result: QueryResultRow): Employee {
    const { employeeid, employeename, ssn, email, phone, username, password, occupation, assigned_building } = result;
    return new Employee(employeeid, employeename, ssn, email, phone, username, password, occupation, assigned_building);
  }

  async getById(id: number): Promise<Employee> {
    let result: QueryResult;

    try {
      result = await query(
        `SELECT *
         FROM employee
                  LEFT JOIN Employee_Occupation ON EmployeeID = EID
         WHERE Employee.EmployeeID = $1`,
        [id]
      );
    } catch (err) {
      throw new PGConnectionError(err);
    }

    if (result.rows.length != 1) {
      return Promise.reject(new NotFound(id));
    }

    return EmployeeRepoPG.explodeResultToEmployee(result.rows[0]);
  }

  async getByUsername(searchUsername: string): Promise<Employee> {
    let result: QueryResult;
    try {
      result = await query(
        `SELECT *
         FROM employee
                  LEFT JOIN
              Employee_Occupation ON EmployeeID = EID
         WHERE username = $1`,
        [searchUsername]
      );
    } catch (err) {
      throw new PGConnectionError(err);
    }

    if (result.rows.length != 1) {
      return Promise.reject(new NotFound(searchUsername));
    }

    return EmployeeRepoPG.explodeResultToEmployee(result.rows[0]);
  }

  async save(newEmployee: Employee): Promise<void> {
    try {
      await query(`BEGIN`);
      await query(
        `INSERT INTO Employee
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        [
          newEmployee.id,
          newEmployee.name,
          newEmployee.ssn,
          newEmployee.email,
          newEmployee.phone,
          newEmployee.username,
          newEmployee.password,
          newEmployee.assigned_building,
        ]
      );
      await query('INSERT INTO Employee_Occupation VALUES ($1,  $2);', [newEmployee.id, newEmployee.occupation]);

      await query(`COMMIT`);
    } catch (err) {
      await query('ROLLBACK');
      throw new PGConnectionError(err);
    }
  }

  async remove(employee: Employee): Promise<void> {
    try {
      await query('BEGIN');

      await query('DELETE FROM Employee_Occupation WHERE EID = $1', [employee.id]);

      await query('DELETE FROM Employee WHERE EmployeeID = $1', [employee.id]);
      await query('COMMIT');
    } catch (err) {
      await query('ROLLBACK');
      throw new PGConnectionError(err);
    }
  }

  async getNextId(): Promise<number> {
    try {
      const result = await query(`SELECT MAX(EmployeeID) AS currentID
                                  FROM employee;`);

      return result.rows[0]['currentid'] + 1;
    } catch (err) {
      throw new PGConnectionError(err);
    }
  }
}

export { EmployeeRepoPG };
