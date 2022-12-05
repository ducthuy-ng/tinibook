import React from 'react';
import classNames from 'classnames';
import styles from '../Modal.module.css';
import deleteModalStyles from './DeleteEmployeeModal.module.css';
import Button from '../../Button/Button';
import { fetcher } from '../../../lib/fetch';
import Modal from '../Modal';

async function sendDeleteEmpRequest(id) {
  await fetcher(`/identity-access/employees?id=${id}`, {
    method: 'DELETE',
  });
}

function DeleteEmployeeModal({ selectedId, displayState, setDisplayState, callRefreshFn }) {
  return (
    <Modal displayState={displayState} setDisplayState={setDisplayState}>
      <div className={classNames(styles.container, deleteModalStyles.container)}>
        <div className={styles.row}>
          <h1>Bạn có chắc chắn muốn xoá nhân viên này?</h1>
        </div>
        <div className={styles.row}>
          <Button
            onClick={() => {
              setDisplayState(false);
            }}
          >
            Huỷ
          </Button>
          <Button
            onClick={() => {
              sendDeleteEmpRequest(selectedId);
              callRefreshFn();
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

export default DeleteEmployeeModal;
