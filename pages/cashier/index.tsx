import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import PayModal from '../../components/Modal/CashierModal/PayModal';
import Table from '../../components/Table/Table';
import Input, { useInputHook } from '../../components/Input/Input';
import cashierStyles from '../../styles/Cashier.module.css';
import { checkRBACRedirect } from '../../lib/redirect';
import { Occupation } from '../../model/identityaccess/domain/employee';
import Popup, { usePopup } from '../../components/Popup/Popup';
import { GetServerSideProps } from 'next';
import { useModal } from '../../components/Modal/Modal';
import { TokenType } from '../../model/identityaccess/authService';
import { getToken } from '../../lib/jwt';
import { ParsedUrlQuery } from 'querystring';
import DeleteIcon from '@mui/icons-material/Delete';
import Header, { HeaderCashier } from '../../components/Header/Header';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect = checkRBACRedirect(context, Occupation.STAFF);
  if (redirect) return redirect;

  return {
    props: {
      token: getToken(context),
    },
  };
};

type InputRow = {
  id: string;
  isbn: string;
  name: string;
  quantity: number;
  book_price: number;
  price: number;
};

export type RowsDataType = Map<string, InputRow>;

export type RowsDataHook = {
  value: RowsDataType;
  setValue: Dispatch<SetStateAction<RowsDataType>>;
  deleteItem: (key: string) => void;
};

const useRowsData = (): RowsDataHook => {
  const [value, setValue] = useState<RowsDataType>(new Map());

  function deleteItem(key: string) {
    const newValue = new Map(value);
    newValue.delete(key);
    setValue(newValue);
  }

  return { value, setValue, deleteItem };
};

function Cashier(props: { token: TokenType; query: ParsedUrlQuery }) {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const isbnHook = useInputHook();
  const quantityHook = useInputHook();

  const payModalHook = useModal();
  const popupHook = usePopup();
  const rowsData = useRowsData();

  const addTableRows = async () => {
    const quantity = parseInt(quantityHook.value);
    if (!quantity) {
      popupHook.setMessage('Số lượng không hợp lệ');
      popupHook.setCurrentVariant('warning');
      popupHook.setShowingState(true);
      quantityHook.changeValue('');
      return;
    }

    const resp = await fetch(`/api/storage/books/${isbnHook.value}?show_location=true`);

    if (!resp.ok) {
      popupHook.setMessage('Mã ISBN không hợp lệ');
      popupHook.setCurrentVariant('warning');
      popupHook.setShowingState(true);
      isbnHook.changeValue('');
      return;
    }

    const data = await resp.json();
    const locationDetail = data['location'].find(
      (location: { [x: string]: string }) => location['buildingId'] == props.token.assignedBuilding
    );

    if (!locationDetail) {
      popupHook.setMessage('Sách không còn tồn kho');
      popupHook.setCurrentVariant('warning');
      popupHook.setShowingState(true);
      isbnHook.changeValue('');
      quantityHook.changeValue('');
      return;
    }

    if (locationDetail['amount'] < quantity || locationDetail['amount'] < quantity) {
      popupHook.setMessage('Số lượng sách không đủ');
      popupHook.setCurrentVariant('warning');
      popupHook.setShowingState(true);
      isbnHook.changeValue('');
      quantityHook.changeValue('');
      return;
    }

    let searchRowsData = rowsData.value.get(isbnHook.value);
    if (searchRowsData) {
      searchRowsData.quantity += quantity;
      searchRowsData.price += quantity * searchRowsData.price;
    } else {
      rowsData.value.set(isbnHook.value, {
        id: data.id,
        isbn: isbnHook.value,
        name: data.name,
        quantity: quantity,
        book_price: parseInt(data.price),
        price: parseInt(data.price) * quantity,
      });
    }

    rowsData.setValue(rowsData.value);
    quantityHook.changeValue('');
    isbnHook.changeValue('');
  };

  return (
    <div>
      <HeaderCashier token={props.token} />
      <div className={cashierStyles.container}>
        <div className={classNames(cashierStyles.row, cashierStyles.row_input)}>
          <h1>Tạo hoá đơn</h1>
        </div>
        <div className={classNames(cashierStyles.row, cashierStyles.row_input)}>
          <label htmlFor="date" className={cashierStyles.label}>
            Ngày tạo:
          </label>
          <p>{date}</p>
        </div>
      </div>
      <div className={cashierStyles.scroll}>
        <Table>
          <thead>
            <tr>
              <th>STT</th>
              <th>ISBN</th>
              <th>Tên sách</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TableRows books={rowsData.value} deleteFn={rowsData.deleteItem} />
          </tbody>
        </Table>
      </div>
      <div className={cashierStyles.container2}>
        <div className={cashierStyles.containerInputData}>
          <div className={classNames(cashierStyles.row, cashierStyles.row_input)}>
            <label htmlFor="ISBN" className={cashierStyles.label}>
              ISBN
            </label>
            <Input id="ISBN" placeholder="Nhập ISBN" inputHook={isbnHook} />
          </div>

          <div className={classNames(cashierStyles.row, cashierStyles.row_input)}>
            <label htmlFor="quatity" className={cashierStyles.label}>
              Số lượng
            </label>
            <Input id="quantity" placeholder="Nhập số lượng" inputHook={quantityHook}></Input>
          </div>
        </div>

        <div className={classNames(cashierStyles.containerButton, cashierStyles.paddingButton)}>
          <Button type="submit" onClick={addTableRows}>
            Thêm
          </Button>
          <Button
            onClick={() => {
              payModalHook.setDisplayState(true);
            }}
          >
            Thanh toán
          </Button>
          <PayModal rowsDataHook={rowsData} popupHook={popupHook} hook={payModalHook} />
        </div>
      </div>
      <Popup popupHook={popupHook} />;
    </div>
  );
}

function TableRows(props: { books: RowsDataType; deleteFn: (key: string) => void }) {
  return (
    <>
      {Array.from(props.books.values()).map((row, index) => (
        <Row key={index} index={index + 1} rowItem={row} deleteFn={props.deleteFn} />
      ))}
    </>
  );
}

function Row(props: { index: number; rowItem: InputRow; deleteFn: (key: string) => void }) {
  return (
    <tr>
      <td className={cashierStyles.tdItem}>{props.index}</td>
      <td className={cashierStyles.tdItem}>{props.rowItem.isbn}</td>
      <td className={cashierStyles.tdItem}>{props.rowItem.name}</td>
      <td className={cashierStyles.tdItem}>{props.rowItem.quantity}</td>
      <td className={cashierStyles.tdItem}>{props.rowItem.book_price}</td>
      <td className={cashierStyles.tdItem}>{props.rowItem.price}</td>
      <td className={cashierStyles.tdItem}>
        <DeleteIcon className={cashierStyles.cursor} onClick={() => props.deleteFn(props.rowItem.isbn)}></DeleteIcon>
      </td>
    </tr>
  );
}

export default Cashier;
