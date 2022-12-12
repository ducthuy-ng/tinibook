import { GetServerSideProps } from 'next';
import { checkRBACRedirect } from '../../../lib/redirect';
import { TokenType } from '../../../model/identityaccess/authService';
import { ParsedUrlQuery } from 'querystring';
import { Occupation } from '../../../model/identityaccess/domain/employee';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../../components/HeaderWithSidebar/HeaderWithSidebar';
import ShopManagementSidebar from '../../../components/Sidebar/Specifics/ShopManagerSidebar';
import { getToken } from '../../../lib/jwt';
import useSWR, { SWRResponse } from 'swr';
import { fetcher } from '../../../lib/swr';
import { SaleReceiptDetail } from '../../api/finance/sale-receipts/[id]';
import classNames from 'classnames';
import styles from '../../../components/Modal/Modal.module.css';
import moduleStyles from '../../../components/Modal/BookInfo/BookInfo.module.css';
import Button from '../../../components/Button/Button';
import React from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect = checkRBACRedirect(context, Occupation.SHOP_MANAGER);
  if (redirect) return redirect;

  let { id } = context.query;
  if (!id) return { redirect: { destination: '/shop-manager/sale-records', permanent: false } };

  if (Array.isArray(id)) id = id[0];

  return {
    props: { token: getToken(context), query: context.query, id: id },
  };
};

export default function SaleRecordDetail(props: { token: TokenType; query: ParsedUrlQuery; id: string }) {
  const headerHook = useHeaderWithSidebarHook();
  const receiptData = useSWR<SaleReceiptDetail>(`/api/finance/sale-receipts/${props.id}`, fetcher);

  return (
    <>
      <HeaderWithSidebar token={props.token} hook={headerHook} sidebar={ShopManagementSidebar} />
      <SaleRecordDisplay receipt={receiptData} />
    </>
  );
}

function SaleRecordDisplay(props: { receipt: SWRResponse<SaleReceiptDetail> }) {
  const router = useRouter();

  if (props.receipt.error) return <div>Không thể kết nối đến máy chủ</div>;
  if (!props.receipt.data) return <div>Đang tải</div>;

  const receipt = props.receipt.data;
  return (
    <div className={classNames(styles.container, moduleStyles.container)}>
      <div className={classNames(styles.row)}>
        <h1>Chi tiết hoá đơn</h1>
      </div>

      <div className={classNames(styles.row, moduleStyles.basic_info_container)}>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Mã hoá đơn:</p>
          <p>{receipt.id}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Ngày tạo:</p>
          <p>{new Date(receipt.createdDate).toLocaleDateString()}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Mã thu ngân:</p>
          <p>{receipt.createdCashierId}</p>
        </div>
        <div className={classNames(styles.row, styles.row_info)}>
          <p className={styles.row_info_name}>Tổng tiền:</p>
          <p>{receipt.totalPrice}</p>
        </div>
      </div>

      <table className={moduleStyles.table}>
        <thead>
          <tr>
            <th>Mã kho</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {receipt.orderedBooks.map((order, index) => (
            <tr key={index}>
              <td className={moduleStyles.book_name_column}>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.amount}</td>
              <td>{order.total}</td>
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
          Quay lại
        </Button>
      </div>
    </div>
  );
}
