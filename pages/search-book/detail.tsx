import HeaderCustomer from '../../components/Header/HeaderCustomer';
import useSWR from 'swr';
import classNames from 'classnames';
import styles from '../../components/Modal/Modal.module.css';
import moduleStyles from '../../components/Modal/BookInfo/BookInfo.module.css';
import React from 'react';
import { Book } from '../../model/bookMngt/domain/Book';
import { useRouter } from 'next/router';
import { fetcher } from '../../lib/swr';
import { GetServerSideProps } from 'next';
import Button from '../../components/Button/Button';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isbn } = context.query;

  if (!isbn)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

const BookDetail = () => {
  return (
    <>
      <HeaderCustomer />
      <BookInfo />
    </>
  );
};

function BookInfo() {
  const router = useRouter();
  let { isbn } = router.query;

  const { data, error } = useSWR<Book | any>(`/api/storage/books/${isbn}?show_location=true`, fetcher);

  if (error) return <div>Không thể kết nối đến máy chủ</div>;
  if (!data) return <div>Đang tải...</div>;

  return (
    <div className={classNames(styles.container, moduleStyles.container)}>
      <div className={classNames(styles.row)}>
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Quay lại
        </Button>
      </div>

      <div className={classNames(styles.row)}>
        <h1>Vị trí lưu trữ</h1>
      </div>

      <div className={classNames(styles.row, moduleStyles.basic_info_container)}>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Tên sách:</p>
          <p>{data.name}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Thể loại:</p>
          <p>{data.type}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Giá bìa:</p>
          <p>{data.price}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Tác giả</p>
          <p>{data.author}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Nhà xuất bản:</p>
          <p>{data.publisher}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Số trang:</p>
          <p>{data.pagesNum}</p>
        </div>
      </div>

      <table className={moduleStyles.table}>
        <thead>
          <tr>
            <th>Mã kho</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {data.location.map((location: { buildingId: string; buildingName: string; amount: number }) => (
            <tr key={location['buildingId']}>
              <td>{location['buildingName']}</td>
              <td>{location['amount']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookDetail;
