import { GetServerSideProps } from 'next';
import { checkRBACRedirect } from '../../lib/redirect';
import { Occupation } from '../../model/identityaccess/domain/employee';
import { getToken } from '../../lib/jwt';
import { ParsedUrlQuery } from 'querystring';
import { TokenType } from '../../model/identityaccess/authService';
import styles from '../../components/Modal/Modal.module.css';
import classNames from 'classnames';
import Input, { useInputHook } from '../../components/Input/Input';
import Select, { useSelect } from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import AccountantSidebar from '../../components/Sidebar/Specifics/AccountantSidebar';
import { MouseEventHandler } from 'react';
import Popup, { usePopup } from '../../components/Popup/Popup';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect = checkRBACRedirect(context, Occupation.ACCOUNTANT);
  if (redirect) return redirect;

  return {
    props: {
      query: context.query,
      token: getToken(context),
    },
  };
};

const OccupationMap: Record<string, string> = {
  SHOP_MANAGER: 'Quản lý cửa hàng',
  STAFF: 'Tạp vụ',
  STORAGE_MANAGER: 'Quản lý kho bãi',
  ACCOUNTANT: 'Kế toán',
};

export default function AddEmployee(props: { query: ParsedUrlQuery; token: TokenType }) {
  const headerHook = useHeaderWithSidebarHook();
  const popupHook = usePopup();
  const router = useRouter();

  const fullNameHook = useInputHook();
  const ssnHook = useInputHook();
  const emailHook = useInputHook();
  const phoneHook = useInputHook();
  const occupationHook = useSelect<Occupation>(Occupation.STAFF);

  const occupations: string[] = [];
  for (const occupation in Occupation) occupations.push(occupation);

  const resetForm = () => {
    fullNameHook.changeValue('');
    ssnHook.changeValue('');
    emailHook.changeValue('');
    phoneHook.changeValue('');
  };

  const sendAddEmployeeRequest: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const body = {
      name: fullNameHook.value,
      ssn: ssnHook.value,
      email: emailHook.value,
      phone: phoneHook.value,
      occupation: occupationHook.value,
    };

    if (!body.name) {
      popupHook.setCurrentVariant('warning');
      popupHook.setMessage('Tên không được để trống');
      popupHook.setShowingState(true);
      return;
    }

    if (!body.ssn) {
      popupHook.setCurrentVariant('warning');
      popupHook.setMessage('CCCD không được để trống');
      popupHook.setShowingState(true);
      return;
    }

    const resp = await fetch(`/api/identity-access/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    switch (resp.status) {
      case 201:
        popupHook.setCurrentVariant('success');
        popupHook.setMessage('Ghi nhận thành công');
        popupHook.setShowingState(true);
        resetForm();
        return;

      default:
        const body = await resp.json();
        popupHook.setCurrentVariant('warning');
        popupHook.setMessage(body['message']);
        popupHook.setShowingState(true);
        return;
    }
  };

  return (
    <>
      <HeaderWithSidebar token={props.token} hook={headerHook} sidebar={AccountantSidebar} />
      <form className={styles.container}>
        <div className={classNames(styles.row)}>
          <h1>Thêm nhân viên</h1>
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="fullName" className={styles.label}>
            Họ và tên
          </label>
          <Input id="fullName" inputHook={fullNameHook} placeholder="Họ và tên" />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="ssn" className={styles.label}>
            CCCD
          </label>
          <Input id="ssn" inputHook={ssnHook} placeholder="CCCD / CMND" />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <Input id="email" inputHook={emailHook} placeholder="Email" />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="phone" className={styles.label}>
            Số điện thoại
          </label>
          <Input id="phone" inputHook={phoneHook} placeholder="Số điện thoại" />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="occupation" className={styles.label}>
            Chức vụ
          </label>
          <Select hook={occupationHook} id={'occupation'}>
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation}>
                {OccupationMap[occupation]}
              </option>
            ))}
          </Select>
        </div>
        <div className={classNames(styles.row, styles.row_center)}>
          <Button type={'button'} onClick={() => router.push('/accountant/human-resources')}>
            Quay lại
          </Button>
          <Button type={'button'} onClick={sendAddEmployeeRequest}>
            Xác nhận
          </Button>
        </div>
      </form>
      <Popup popupHook={popupHook} />
    </>
  );
}
