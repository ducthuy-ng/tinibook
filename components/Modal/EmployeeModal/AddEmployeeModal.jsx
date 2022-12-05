import React from 'react';
import classNames from 'classnames';
import styles from '../Modal.module.css';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import useSWR from 'swr';
import { fetcher } from '../../../lib/fetch';
import Select from '../../Select/Select';
import Modal from '../Modal';

async function sendNewEmpRequest() {
  const data = {};
  data.name = document.querySelector('#fullName').value;
  data.ssn = document.querySelector('#ssn').value;
  data.email = document.querySelector('#email').value;
  data.tel = document.querySelector('#phone').value;
  data.occupation = document.querySelector('#occupation').value;

  await fetcher('/identity-access/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
}

function AddEmployeeModal({ displayState, setDisplayState, callRefreshFn }) {
  const { data, error } = useSWR('/identity-access/occupations', fetcher);
  if (error) return <div>Cannot connect to backend temporary. Please try again later.</div>;
  return (
    <Modal displayState={displayState} setDisplayState={setDisplayState}>
      <div className={styles.container}>
        <div className={classNames(styles.row)}>
          <h1>Thêm nhân viên</h1>
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="fullName" className={styles.label}>
            Họ và tên
          </label>
          <Input id="fullName" name={'fullName'} placeholder="Họ và tên" />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="ssn" className={styles.label}>
            CCCD
          </label>
          <Input id="ssn" placeholder="CCCD / CMND" />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <Input id="email" placeholder="Email" />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="phone" className={styles.label}>
            Số điện thoại
          </label>
          <Input id="phone" placeholder="Số điện thoại" />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="occupation" className={styles.label}>
            Chức vụ
          </label>
          <Select id={'occupation'}>{data && data.map((value, index) => <option key={index}>{value}</option>)}</Select>
        </div>
        <div className={classNames(styles.row, styles.row_center)}>
          <Button
            type={'submit'}
            onClick={async () => {
              await sendNewEmpRequest(callRefreshFn);
              callRefreshFn();
              // mutate("/identity-access/employees");
              setDisplayState(false);
            }}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddEmployeeModal;
