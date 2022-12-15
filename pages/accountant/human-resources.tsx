import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import styles from '../../styles/HumanResource.module.css';
import useSWR, { SWRResponse } from 'swr';
import classNames from 'classnames';
import { checkRBACRedirect } from '../../lib/redirect';
import AccountantSidebar from '../../components/Sidebar/Specifics/AccountantSidebar';
import { GetServerSideProps } from 'next';
import { Employee, Occupation } from '../../model/identityaccess/domain/employee';

import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import { fetcher } from '../../lib/swr';
import { TokenType } from '../../model/identityaccess/authService';
import { getToken } from '../../lib/jwt';
import Searchbar from '../../components/Searchbar/Searchbar';
import Table from '../../components/Table/Table';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const redirect = checkRBACRedirect(context, Occupation.ACCOUNTANT);
  if (redirect) return redirect;

  return {
    props: {
      token: getToken(context),
    },
  };
};

function Employees(props: { token: TokenType }) {
  const employeeResp = useSWR<Employee[]>(`/api/identity-access/employees`, fetcher, { revalidateIfStale: true });

  const router = useRouter();
  // Add Employee Model
  const [addEmployeeModelDisplay, setAddEmployeeModelDisplay] = useState(false);

  // delete Employee Modal
  const [deleteEmpModalDisplay, setDeleteEmpModalDisplay] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(0);

  useEffect(() => {
    document.body.style.overflow = deleteEmpModalDisplay || addEmployeeModelDisplay ? 'hidden' : 'unset';
  });

  const headerHook = useHeaderWithSidebarHook();

  return (
    <div className={classNames()}>
      <HeaderWithSidebar hook={headerHook} sidebar={AccountantSidebar} token={props.token} className={styles.header} />
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Danh sách nhân viên</h1>
          <div className={styles.title_action_group}>
            <Searchbar />
            <Button
              className={styles.add_emp_btn}
              onClick={() => {
                router.push('/accountant/add-employee');
                setAddEmployeeModelDisplay(true);
              }}
            >
              Tạo nhân viên
            </Button>
          </div>
        </div>
        <EmployeeTable employeeResp={employeeResp} />
      </div>

      {/*<DeleteEmployeeModal*/}
      {/*selectedId={selectedEmpId}*/}
      {/*displayState={deleteEmpModalDisplay}*/}
      {/*setDisplayState={setDeleteEmpModalDisplay}*/}
      {/*callRefreshFn={mutate}*/}
      {/*/>*/}
    </div>
  );
}

const OccupationMap: Record<string, string> = {
  SHOP_MANAGER: 'Quản lý cửa hàng',
  STAFF: 'Tạp vụ',
  STORAGE_MANAGER: 'Quản lý kho bãi',
  ACCOUNTANT: 'Kế toán',
};

function EmployeeTable(props: { employeeResp: SWRResponse<Employee[]> }) {
  if (props.employeeResp.error) return <div>Không thể kết nối đến hệ thống</div>;
  if (!props.employeeResp.data) return <div>Đang tải</div>;

  return (
    <Table>
      <thead>
        <tr>
          <th>MSNV</th>
          <th>Họ và tên</th>
          <th>Chức vụ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.employeeResp.data.map((employee) => (
          <tr key={employee['id']}>
            <td>{employee['id']}</td>
            <td>{employee['name']}</td>
            <td>{OccupationMap[employee['occupation']]}</td>
            <td className={styles.EditDeleteCol}>
              <FontAwesomeIcon className={styles.edit_btn} icon={faTrashCan} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Employees;
