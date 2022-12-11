import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal, { ModalHook, useModal } from '../Modal';
import styles from '../Modal.module.css';
import specificStyles from './BookTransferModal.module.css';
import { BookSearchType } from '../../../pages/api/storage/books/[isbn]';
import classNames from 'classnames';
import Input, { useInputHook } from '../../Input/Input';
import Select, { useSelect } from '../../Select/Select';
import { Building } from '../../../model/bookMngt/domain/Building';
import { cursorTo } from 'readline';
import useSWR, { KeyedMutator } from 'swr';
import { fetcher } from '../../../lib/swr';
import Button from '../../Button/Button';
import { PopupHook } from '../../Popup/Popup';

export interface BookTransferHook {
  modalHook: ModalHook;
  selectedISBN: string;
  setSelectedISBN: Dispatch<SetStateAction<string>>;
}

export function useBookTransfer(): BookTransferHook {
  const modalHook = useModal();
  const [selectedISBN, setSelectedISBN] = useState('');
  return { modalHook, selectedISBN: selectedISBN, setSelectedISBN: setSelectedISBN };
}

const BookTransferModal = (props: {
  hook: BookTransferHook;
  currentBuilding: string;
  popupHook: PopupHook;
  mutateFn?: KeyedMutator<any>;
}) => {
  const [bookDetail, setBookDetail] = useState<BookSearchType | null>(null);

  useEffect(() => {
    if (!props.hook.selectedISBN) return;
    fetch(`/api/storage/books/${props.hook.selectedISBN}?show_location=true`)
      .then((resp) => {
        if (!resp.ok) throw new Error();
        return resp.json();
      })
      .then((parsedDetail) => setBookDetail(parsedDetail))
      .catch(() => setBookDetail(null));
  }, [props.hook.selectedISBN]);

  return (
    <Modal hook={props.hook.modalHook}>
      <div className={styles.row}>
        <h2>Chuyển sách</h2>
      </div>

      {bookDetail ? (
        <TransferForm
          hook={props.hook}
          bookDetail={bookDetail}
          currentBuilding={props.currentBuilding}
          popupHook={props.popupHook}
          mutateFn={props.mutateFn}
        />
      ) : (
        <div className={styles.row}>Lỗi hệ thống</div>
      )}
    </Modal>
  );
};

function TransferForm(props: {
  hook: BookTransferHook;
  bookDetail: BookSearchType;
  currentBuilding: string;
  popupHook: PopupHook;
  mutateFn?: KeyedMutator<any>;
}) {
  const { data } = useSWR<Building[]>(`/api/storage/buildings`, fetcher);

  const quantity = useInputHook();
  const selectedBuilding = useSelect<String>('---');

  const sendTransferRequest = async () => {
    if (selectedBuilding.value == '---') {
      props.popupHook.setCurrentVariant('warning');
      props.popupHook.setMessage('Lựa chọn không hợp lệ');
      props.popupHook.setShowingState(true);
      return;
    }

    props.hook.modalHook.setDisplayState(false);

    const res = await fetch(`/api/storage/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId: props.bookDetail.id,
        sourceBuildingId: props.currentBuilding,
        destBuildingId: selectedBuilding.value,
        amount: quantity.value,
      }),
    });

    switch (res.status) {
      case 200:
        props.popupHook.setCurrentVariant('success');
        props.popupHook.setMessage('Ghi nhận thành công');
        props.popupHook.setShowingState(true);
        if (props.mutateFn) props.mutateFn();
        return;
      default:
        const body = await res.json();
        props.popupHook.setCurrentVariant('warning');
        props.popupHook.setMessage(body['message']);
        props.popupHook.setShowingState(true);
        return;
    }
  };

  return (
    <>
      <div className={specificStyles.container}>
        <div className={specificStyles.row_detail}>
          <p>ISBN:</p>
          <p className={specificStyles.row_detail_content}>{props.bookDetail.isbn}</p>
        </div>
        <div className={specificStyles.row_detail}>
          <p>Tên sách:</p>
          <p className={specificStyles.row_detail_content}>{props.bookDetail.name}</p>
        </div>
      </div>
      <hr />
      <div className={specificStyles.container}>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="buildingId" className={styles.label}>
            Chuyển đến:
          </label>

          <Select id="buildingId" hook={selectedBuilding}>
            {data &&
              (data as Building[]).map(
                (building) =>
                  building.id != props.currentBuilding && (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  )
              )}
          </Select>
        </div>
        <div className={classNames(styles.row, styles.row_input)}>
          <label htmlFor="quantity" className={styles.label}>
            Số lượng:
          </label>
          <Input id="quantity" inputHook={quantity} />
        </div>
      </div>
      <hr />
      <div className={classNames(styles.row)}>
        <Button onClick={sendTransferRequest}>Xác nhận</Button>
      </div>
    </>
  );
}

export default BookTransferModal;
