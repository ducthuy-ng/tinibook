import { NextApiRequest, NextApiResponse } from 'next';
import { Employee } from '../../../model/identityaccess/domain/employee';
import { NotFound } from '../../../model/identityaccess/domain/exceptions';
import {
  authService,
  employeeRepo,
  sendInternalErrorResponse,
  sendInvalidCredentialResponse,
  sendInvalidQueryResponse,
} from '../../../lib/api';
import { setCookie } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ token: string }>) {
  if (!req.body.username || !req.body.password) {
    return sendInvalidQueryResponse(res, 'Thiếu tên người dùng hoặc mật khẩu');
  }

  const { username, password } = req.body;

  let searchEmployee: Employee;
  try {
    searchEmployee = await employeeRepo.getByUsername(username);

    if (searchEmployee.password != password) {
      return sendInvalidCredentialResponse(res);
    }

    const token = authService.generateNewToken(searchEmployee);

    setCookie({ res }, 'API_TOKEN', token, {
      maxAge: 30 * 60,
      path: '/',
    });

    res.redirect('/');
  } catch (err) {
    if (err instanceof NotFound) {
      return sendInvalidCredentialResponse(res);
    }
    return sendInternalErrorResponse(res);
  }
}
