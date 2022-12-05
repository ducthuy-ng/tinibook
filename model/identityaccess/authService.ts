import { Employee, EmployeeRepo, Occupation } from './domain/employee';

import { sign } from 'jsonwebtoken';

const tokenExpiredSecs = 1800;

export type TokenType = {
  employeeId: number;
  employeeName: string;
  occupation: Occupation;
  assignedBuilding: string;
};

class AuthService {
  private employeeRepo: EmployeeRepo;
  private readonly tokenSignKey: string;

  constructor(employeeRepo: EmployeeRepo, tokenSignKey: string) {
    this.employeeRepo = employeeRepo;
    this.tokenSignKey = tokenSignKey;
  }

  generateNewToken(employee: Employee) {
    const unsignedToken: TokenType = {
      employeeId: employee.id,
      employeeName: employee.name,
      occupation: employee.occupation,
      assignedBuilding: employee.assigned_building,
    };
    return sign(unsignedToken, this.tokenSignKey, {
      expiresIn: `${tokenExpiredSecs}s`,
    });
  }
}

export { AuthService };
