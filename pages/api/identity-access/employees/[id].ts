import { NextApiRequest, NextApiResponse } from 'next';
import { explodeResultToEmployee, query } from '../../../../lib/postgres';
import { sendInternalErrorResponse, sendNotFoundResponse } from '../../../../lib/api';

export default async function getEmployee(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const result = await query(
      `SELECT *
       FROM employee
                LEFT JOIN employee_occupation ON EmployeeID = EID
       WHERE employee.EmployeeID = $1`,
      [id]
    );

    if (result.rows.length != 1) {
      return sendNotFoundResponse(res);
    }

    const employee = explodeResultToEmployee(result.rows[0]);

    res.json(employee);
  } catch (err) {
    sendInternalErrorResponse(res);
  }
}
