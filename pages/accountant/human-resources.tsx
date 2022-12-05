import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import styles from '../../styles/HumanResource.module.css';
import useSWR from 'swr';
import classNames from 'classnames';
import { checkRBACRedirect } from '../../lib/redirect';
import AccountantSidebar from '../../components/Sidebar/Specifics/AccountantSidebar';
import { GetServerSideProps } from 'next';
import { Occupation } from '../../model/identityaccess/domain/employee';

import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import { fetcher } from '../../lib/swr';
import { TokenType } from '../../model/identityaccess/authService';
import { getToken } from '../../lib/jwt';
import Searchbar from '../../components/Searchbar/Searchbar';

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
  const { data, mutate, error } = useSWR(`/api/identity-access/employees`, fetcher, { revalidateIfStale: true });

  // Add Employee Model
  const [addEmployeeModelDisplay, setAddEmployeeModelDisplay] = useState(false);
  const addEmpBtn = (
    <Button
      className={styles.add_emp_btn}
      onClick={() => {
        setAddEmployeeModelDisplay(true);
      }}
    >
      Tạo nhân viên
    </Button>
  );

  // delete Employee Modal
  const [deleteEmpModalDisplay, setDeleteEmpModalDisplay] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(0);

  const [displaySideBar, setDisplaySidebar] = useState(false);

  useEffect(() => {
    document.body.style.overflow = deleteEmpModalDisplay || addEmployeeModelDisplay ? 'hidden' : 'unset';
  });

  const sidebarHook = useHeaderWithSidebarHook();

  return (
    <div className={classNames()}>
      {/*<Header setDisplaySidebar={setDisplaySidebar} />*/}

      <HeaderWithSidebar hook={sidebarHook} sidebar={AccountantSidebar} token={props.token} />
      <div className={styles.title}>
        <h1>Danh sách nhân viên</h1>
        <div className={styles.title_action_group}>
          <Searchbar />
        </div>
      </div>
      {/*<EmployeeTable*/}
      {/*  data={data}*/}
      {/*  error={error}*/}
      {/*  setSelectedEmpId={setSelectedEmpId}*/}
      {/*  setDeleteEmpModalDisplay={setDeleteEmpModalDisplay}*/}
      {/*/>*/}

      {/*<AddEmployeeModal*/}
      {/*displayState={addEmployeeModelDisplay}*/}
      {/*setDisplayState={setAddEmployeeModelDisplay}*/}
      {/*callRefreshFn={mutate}*/}
      {/*/>*/}
      {/*<DeleteEmployeeModal*/}
      {/*selectedId={selectedEmpId}*/}
      {/*displayState={deleteEmpModalDisplay}*/}
      {/*setDisplayState={setDeleteEmpModalDisplay}*/}
      {/*callRefreshFn={mutate}*/}
      {/*/>*/}
    </div>
  );
}

// function EmployeeTable({ data, error, setSelectedEmpId, setDeleteEmpModalDisplay }) {
//   if (error) return <div>Error</div>;
//   if (!data) return <div>Loading...</div>;
//
//   return (
//     <Table>
//       <thead>
//       <tr>
//         <th>MSNV</th>
//         <th>Họ và tên</th>
//         <th>Chức vụ</th>
//         <th></th>
//       </tr>
//       </thead>
//       <tbody>
//       {data.map((employee) => (
//         <tr key={employee['id']}>
//           <td>{employee['id']}</td>
//           <td>{employee['name']}</td>
//           <td>{employee['occupation']}</td>
//           <td className={styles.EditDeleteCol}>
//             <Delete
//               className={styles.edit_btn}
//               onClick={() => {
//                 setSelectedEmpId(employee['id']);
//                 setDeleteEmpModalDisplay(true);
//               }}
//             ></Delete>
//           </td>
//         </tr>
//       ))}
//       </tbody>
//     </Table>
//   );
// }

export default Employees;
