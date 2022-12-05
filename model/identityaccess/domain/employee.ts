enum Occupation {
  SHOP_MANAGER = 'SHOP_MANAGER',
  STORAGE_MANAGER = 'STORAGE_MANAGER',
  ACCOUNTANT = 'ACCOUNTANT',
  STAFF = 'STAFF',
}

class Employee {
  id: number;
  name: string;
  ssn: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  assigned_building: string;
  occupation: Occupation;

  constructor(
    id: number,
    name: string,
    ssn: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    occupation: string,
    assigned_building: string
  ) {
    this.id = id;
    this.name = name;
    this.ssn = ssn;
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;
    this.occupation = occupation as Occupation;
    this.assigned_building = assigned_building;
  }
}

type EmployeeBrief = {
  id: number;
  name: string;
  occupation: Occupation;
};

interface EmployeeRepo {
  getById(id: number): Promise<Employee>;

  getByUsername(username: string): Promise<Employee>;

  save(newEmployee: Employee): Promise<void>;

  remove(employee: Employee): Promise<void>;

  getNextId(): Promise<number>;
}

export { Occupation, Employee };
export type { EmployeeBrief, EmployeeRepo };
