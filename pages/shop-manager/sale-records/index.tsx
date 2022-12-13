import { GetServerSideProps } from 'next';
import { checkRBACRedirect } from '../../../lib/redirect';
import { getToken } from '../../../lib/jwt';
import { TokenType } from '../../../model/identityaccess/authService';
import { ParsedUrlQuery } from 'querystring';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../../components/HeaderWithSidebar/HeaderWithSidebar';
import ShopManagementSidebar from '../../../components/Sidebar/Specifics/ShopManagerSidebar';
import { Occupation } from '../../../model/identityaccess/domain/employee';
import useSWR from 'swr';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { SaleReceiptBrief } from '../../api/finance/sale-receipts';
import Button from '../../../components/Button/Button';
import styles from '../../../styles/SaleRecords.module.css';
import { fetcher } from '../../../lib/swr';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Property } from 'csstype';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect = checkRBACRedirect(context, Occupation.SHOP_MANAGER);
  if (redirect) return redirect;

  return {
    props: {
      token: getToken(context),
      query: context.query,
    },
  };
};

export default function SaleRecords(props: { token: TokenType; query: ParsedUrlQuery }) {
  const sidebarHook = useHeaderWithSidebarHook();

  return (
    <>
      <HeaderWithSidebar
        className={styles.header}
        token={props.token}
        hook={sidebarHook}
        sidebar={ShopManagementSidebar}
      />
      <DisplayRecords />
    </>
  );
}

function DisplayRecords() {
  const pageNumHook = useSWR('/api/finance/sale-receipts?maxPage=true');
  const router = useRouter();

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (!pageNumHook.error && pageNumHook.data && pageIndex >= pageNumHook.data) return null;
    return `/api/finance/sale-receipts?page=${pageIndex + 1}`;
  };

  let { data, error, size, setSize } = useSWRInfinite<SaleReceiptBrief[]>(getKey, fetcher);
  if (error) return <div>Không thể kết nối đến máy chủ</div>;
  if (!data) return <div>Đang tải...</div>;

  return (
    <>
      <table className={styles.receipt_table}>
        <thead>
          <tr className={styles.receipt_table_row}>
            <th>Mã hoá đơn</th>
            <th>Ngày tạo</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {data.map((receiptList, index) => {
            return receiptList.map((receipt) => (
              <tr
                key={receipt.id}
                className={classNames(styles.receipt_table_row, styles.receipt_table_item_row)}
                onClick={() => router.push(`/shop-manager/sale-records/detail?id=${receipt.id}`)}
              >
                <td>{receipt.id}</td>
                <td>{new Date(receipt.createdDate).toLocaleDateString()}</td>
                <td>{receipt.price}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
      <div className={styles.bottomRow}>
        <Button onClick={() => setSize(size + 1)}>Load More</Button>
      </div>
    </>
  );
}
