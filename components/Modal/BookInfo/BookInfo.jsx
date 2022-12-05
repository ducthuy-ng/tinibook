import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from '../Modal.module.css';
import moduleStyles from './BookInfo.module.css';
import Modal from '../Modal';
import useSWR from 'swr';
import { fetcher } from '../../../lib/fetch';

function BookInfo({ selectedBookId, displayState, setDisplayState }) {
  // const {data, error} = useSWR('/storage/books')
  return (
    <Modal displayState={displayState} setDisplayState={setDisplayState}>
      <div className={classNames(styles.container, moduleStyles.container)}>
        <div className={classNames(styles.row)}>
          <h1>Vị trí lưu trữ</h1>
        </div>

        <div className={classNames(styles.row, moduleStyles.basic_info_container)}>
          <div className={classNames(styles.row, styles.row_info)}>
            <p className={styles.row_info_name}>Tên sách:</p>
            <p>Conan</p>
          </div>
          <div className={classNames(styles.row, styles.row_info)}>
            <p className={styles.row_info_name}>Thể loại:</p>
            <p>Truyện tranh</p>
          </div>
          <div className={classNames(styles.row, styles.row_info)}>
            <p className={styles.row_info_name}>Giá bìa:</p>
            <p>18000</p>
          </div>
          <div className={classNames(styles.row, styles.row_info)}>
            <p className={styles.row_info_name}>Tác giả</p>
            <p>abc</p>
          </div>
          <div className={classNames(styles.row, styles.row_info)}>
            <p className={styles.row_info_name}>Nhà xuất bản:</p>
            <p>abc</p>
          </div>
          <div className={classNames(styles.row, styles.row_info)}>
            <p className={styles.row_info_name}>Số trang:</p>
            <p>100</p>
          </div>
        </div>

        <div>
          <LocationTable bookId={selectedBookId} displayState={displayState} />
        </div>
      </div>
    </Modal>
  );
}

function LocationTable({ bookId, displayState }) {
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (!displayState) {
      setTimeout(() => setShouldFetch(false), 100);
    } else {
      setShouldFetch(displayState);
    }
  }, [displayState]);

  const { data, error } = useSWR(shouldFetch ? `/storage/get-location-of-book?bookId=${bookId}` : null, fetcher);
  if (error) return <p>Something went wrong</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <table className={moduleStyles.table}>
      <thead>
        <tr>
          <th>Mã kho</th>
          <th>Số lượng</th>
        </tr>
      </thead>
      <tbody>
        {data.map((location) => (
          <tr key={location['buildingId']}>
            <td>{location['buildingName']}</td>
            <td>{location['amount']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookInfo;
