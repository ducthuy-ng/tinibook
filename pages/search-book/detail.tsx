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
import { getToken } from '../../lib/jwt';
import { TokenType } from '../../model/identityaccess/authService';
import { ParsedUrlQuery } from 'querystring';
import { Occupation } from '../../model/identityaccess/domain/employee';
import AccountantSidebar from '../../components/Sidebar/Specifics/AccountantSidebar';
import ShopManagementSidebar from '../../components/Sidebar/Specifics/ShopManagerSidebar';
import StorageManagerSidebar from '../../components/Sidebar/Specifics/StorageManagerSidebar';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isbn } = context.query;
  if (!isbn)
    return {
      redirect: {
        destination: '/search-book',
        permanent: false,
      },
    };

  const token = getToken(context);
  return {
    props: {
      token: token,
      query: context.query,
    },
  };
};

const selectHeaderForOccupation: Map<Occupation, any> = new Map([
  [Occupation.STAFF, AccountantSidebar],
  [Occupation.SHOP_MANAGER, ShopManagementSidebar],
  [Occupation.STORAGE_MANAGER, StorageManagerSidebar],
  [Occupation.ACCOUNTANT, AccountantSidebar],
]);

const BookDetail = (props: { token?: TokenType; query: ParsedUrlQuery }) => {
  const header = useHeaderWithSidebarHook();
  return (
    <>
      {props.token ? (
        <HeaderWithSidebar
          token={props.token}
          hook={header}
          sidebar={selectHeaderForOccupation.get(props.token.occupation)}
        />
      ) : (
        <HeaderCustomer />
      )}
      <BookInfo token={props.token} />
    </>
  );
};

function BookInfo(props: { token?: TokenType }) {
  const router = useRouter();
  let { isbn } = router.query;

  const { data, error } = useSWR<Book | any>(`/api/storage/books/${isbn}?show_location=true`, fetcher);

  if (error) return <div>Kh??ng th??? k???t n???i ?????n m??y ch???</div>;
  if (!data) return <div>??ang t???i...</div>;

  return (
    <div className={classNames(styles.container, moduleStyles.container)}>
      <div className={classNames(styles.row)}>
        <h1>V??? tr?? l??u tr???</h1>
      </div>

      <div className={classNames(styles.row, moduleStyles.basic_info_container)}>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>T??n s??ch:</p>
          <p>{data.name}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Th??? lo???i:</p>
          <p>{data.type}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Gi?? b??a:</p>
          <p>{data.price}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>T??c gi???</p>
          <p>{data.author}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Nh?? xu???t b???n:</p>
          <p>{data.publisher}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>S??? trang:</p>
          <p>{data.pagesNum}</p>
        </div>
      </div>

      <table className={moduleStyles.table}>
        <thead>
          <tr>
            <th>M?? kho</th>
            <th>S??? l?????ng</th>
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

      <div className={classNames(styles.row)}>
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Quay l???i
        </Button>
        {props.token?.occupation == Occupation.STORAGE_MANAGER ? (
          <Button onClick={() => router.push(`/search-book/update?isbn=${isbn}`)}>C???p nh???t</Button>
        ) : null}
      </div>
    </div>
  );
}

export default BookDetail;
