import { NextApiRequest, NextApiResponse } from 'next';
import { Employee } from '../../../../model/identityaccess/domain/employee';
import {
  employeeRepo,
  sendCreatedResponse,
  sendInternalErrorResponse,
  sendInvalidCredentialResponse,
  sendInvalidQueryResponse,
  sendNotFoundResponse,
} from '../../../../lib/api';
import { parseCookies } from 'nookies';
import { verify } from '../../../../lib/jwt';
import { query } from '../../../../lib/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  if (!cookies['API_TOKEN']) return sendInvalidCredentialResponse(res);

  let token;
  try {
    token = verify(cookies['API_TOKEN']);
  } catch (e) {
    return sendInvalidCredentialResponse(res);
  }

  if (token.occupation != 'ACCOUNTANT') return sendInvalidCredentialResponse(res, 'Invalid role');

  switch (req.method) {
    case 'GET':
      return await getEmployee(req, res);
    case 'POST':
      return await createNewEmployee(req, res);
    case 'DELETE':
      return await deleteEmployee(req, res);
    default:
      return sendNotFoundResponse(res);
  }
}

async function getEmployee(req: NextApiRequest, res: NextApiResponse) {
  const name = String(req.query.empName || '');

  try {
    const results = await query(
      `SELECT Employee.EmployeeID            AS id,
              Employee.EmployeeName          AS name,
              Employee_Occupation.Occupation AS occupation,
              employee.assigned_building     AS assigned_building
       FROM Employee
                LEFT JOIN Employee_Occupation ON Employee.EmployeeID = Employee_Occupation.EID
       WHERE Employee.EmployeeName ILIKE $1;`,
      ['%' + name + '%']
    );

    res.json(results.rows);
  } catch (e) {
    sendInternalErrorResponse(res);
  }
}

async function createNewEmployee(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return sendNotFoundResponse(res);

  const employee = new Employee(
    await employeeRepo.getNextId(),
    req.body['name'],
    req.body['ssn'],
    req.body['email'],
    req.body['phone'],
    '',
    '',
    req.body['occupation'],
    req.body['assigned_building']
  );

  try {
    await employeeRepo.save(employee);
    return sendCreatedResponse(res);
  } catch (e) {
    return sendInternalErrorResponse(res);
  }
}

async function deleteEmployee(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.id === '') return sendInvalidQueryResponse(res, 'Thiếu mã nhân viên');

  const id = parseInt(String(req.query.id || ''));
  if (!id) return sendInvalidQueryResponse(res, 'Mã nhân viên không hợp lệ');

  const deleteEmployee = await employeeRepo.getById(id);
  employeeRepo
    .remove(deleteEmployee)
    .then(() => sendCreatedResponse(res))
    .catch(() => sendInternalErrorResponse(res));
}
