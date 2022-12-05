// import { Employee } from './domain/employee';
// import { EmployeeRepoPG } from './employeeRepoPG';
// import { NotFound } from './domain/exceptions';
//
// describe('EmployeeRepo Postgres Test', () => {
//   const repo = new EmployeeRepoPG();
//
//   // test('getAllBrief', async () => {
//   //   const rows = await repo.getAll();
//   //
//   //   expect(rows).toHaveLength(20);
//   // });
//   //
//   // test('searchByName', async () => {
//   //   const rows = await repo.searchByName('thuy');
//   //
//   //   expect(rows).toHaveLength(1);
//   //   expect(rows[0]).toBeInstanceOf(Employee);
//   //   expect(rows[0].name).toEqual('Nguyen Duc Thuy');
//   // });
//   //
//   // test('searchBriefByName', async () => {
//   //   const results = await repo.searchBrief('Nguyen');
//   //
//   //   results.every((employee) => {
//   //     expect(employee.name.toLowerCase()).toEqual(expect.stringContaining('nguyen'));
//   //   });
//   // });
//   //
//   // test('empty query search brief should return all', async () => {
//   //   const results = await repo.searchBrief('');
//   //
//   //   expect(results).toHaveLength(20);
//   // });
//
//   test('getById', async () => {
//     const result = await repo.getById(1);
//
//     expect(result).toHaveProperty('id', 1);
//     expect(result).toHaveProperty('name', 'Nguyen Duc Thuy');
//     expect(result).toHaveProperty('occupation', 'STORAGE_MANAGER');
//   });
//
//   test('insert then delete', async () => {
//     const newEmployee = new Employee(100, 'KKK', '21345', 'abc@gmail.com', '0000', 'abc', 'abc', 'ACCOUNTANT', '001');
//
//     await repo.save(newEmployee);
//
//     const searchEmployee = await repo.getById(100);
//     expect(searchEmployee).toEqual(newEmployee);
//
//     await repo.remove(searchEmployee);
//
//     try {
//       await repo.getById(100);
//     } catch (e) {
//       expect(e).toBeInstanceOf(NotFound);
//     }
//   });
//
//   test('get next id', async () => {
//     const nextId = await repo.getNextId();
//     expect(nextId).toEqual(21);
//   });
// });
