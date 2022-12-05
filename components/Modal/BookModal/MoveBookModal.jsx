import React from 'react';
import classNames from 'classnames';
import styles from '../Modal.module.css';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

export default function MoveBookModal({ displayMoveBookModalState, setMoveBookModalDisplayState }) {
  return (
    <form className={classNames(styles.modal, displayMoveBookModalState ? styles.modal_show : styles.modal_hide)}>
      <div className={styles.modalContainer}>
        <div className={styles.container}>
          <div>
            <h1>Nhập sách</h1>
          </div>
          <div className={classNames(styles.row, styles.row_input)}>
            <label htmlFor="name" className={styles.label}>
              {' '}
              Tên sách{' '}
            </label>
            <Input id="name" placeholder="Tên sách" />
          </div>
          <div className={classNames(styles.row, styles.row_input)}>
            <label htmlFor="author" className={styles.label}>
              {' '}
              Tác giả{' '}
            </label>
            <Input id="author" placeholder="Tác giả" />
          </div>
          <div className={classNames(styles.row, styles.row_input)}>
            <label htmlFor="ISBN" className={styles.label}>
              {' '}
              ISBN
            </label>
            <Input id="ISBN" placeholder="ISBN" />
          </div>
          <div className={classNames(styles.row, styles.row_input)}>
            <label htmlFor="publish_company" className={styles.label}>
              {' '}
              Nhà xuất bản{' '}
            </label>
            <Input id="publish_company" placeholder="Nhà xuất bản" />
          </div>
          <div className={classNames(styles.row, styles.row_input)}>
            <label htmlFor="date" className={styles.label}>
              {' '}
              Ngày nhập{' '}
            </label>
            <Input id="date" placeholder="Ngày nhập" />
          </div>
          <div className={classNames(styles.row, styles.row_input)}>
            <label htmlFor="quantity" className={styles.label}>
              {' '}
              Số lượng{' '}
            </label>
            <Input id="quantity" placeholder="Số lượng" />
          </div>
          <div className={classNames(styles.row, styles.row_center)}>
            <Button onClick={() => setMoveBookModalDisplayState(false)}> Huỷ </Button>
            <Button onClick={() => setMoveBookModalDisplayState(false)}> Xác nhận </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
