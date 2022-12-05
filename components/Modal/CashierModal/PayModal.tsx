import React from 'react';
import classNames from 'classnames';
import styles from '../Modal.module.css';
import Button from '../../Button/Button';
import Input, { useInputHook } from '../../Input/Input';
import Modal, { ModalHook } from '../Modal';
import Popup, { PopupHook } from '../../Popup/Popup';
import { RowsDataHook, RowsDataType } from '../../../pages/cashier';

function calculateTotalCost(value: RowsDataType) {
  return Array.from(value.values()).reduce(
    (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
    0
  );
}

export default function PayModal(props: { hook: ModalHook; popupHook: PopupHook; rowsDataHook: RowsDataHook }) {
  const moneyReceived = useInputHook();
  const change = useInputHook();

  const totalCost = calculateTotalCost(props.rowsDataHook.value);

  return (
    <Modal hook={props.hook}>
      <div className={styles.container}>
        <div>
          <h1>Thanh toán</h1>
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="thanh_tien" className={styles.label}>
            Thành tiền
          </label>
          <Input id="thanh_tien" value={totalCost} disabled={true} />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="tien_khach" className={styles.label}>
            Thanh toán
          </label>
          <Input id="tien_khach" placeholder="Thanh toán" inputHook={moneyReceived} />
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="tien_thua" className={styles.label}>
            Tiền thừa
          </label>
          <Input id="tien_thua" placeholder="Tiền thừa" inputHook={change} />
        </div>
        <div className={classNames(styles.row, styles.row_center)}>
          <Button
            onClick={() => {
              const received = parseInt(moneyReceived.value);
              if (!received) {
                props.popupHook.setMessage('Số tiền không hợp lệ');
                props.popupHook.setShowingState(true);
                moneyReceived.changeValue('');
                return;
              }

              if (received < totalCost) {
                props.popupHook.setMessage('Số tiền thanh toán chưa đủ');
                props.popupHook.setShowingState(true);
                moneyReceived.changeValue('');
                return;
              }
              const calculatedChange = received - totalCost;
              change.changeValue(String(calculatedChange));
            }}
          >
            Tính tiền
          </Button>

          <Button
            onClick={async () => {
              props.hook.setDisplayState(false);

              const resp = await fetch(`/api/finance/sale-receipts`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  items: Array.from(props.rowsDataHook.value.values()).map((item) => {
                    return {
                      book_id: item.id,
                      amount: item.quantity,
                    };
                  }),
                }),
              });

              if (!resp.ok) {
                props.popupHook.setMessage('Không thể ghi nhận hoá đơn');
                props.popupHook.setShowingState(true);
              }

              props.rowsDataHook.setValue(new Map());
            }}
          >
            Xác nhận
          </Button>
        </div>
      </div>

      <Popup variant={'warning'} popupHook={props.popupHook} />
    </Modal>
  );
}
