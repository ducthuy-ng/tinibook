import { TokenType } from '../../model/identityaccess/authService';
import { ParsedUrlQuery } from 'querystring';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import ShopManagementSidebar from '../../components/Sidebar/Specifics/ShopManagerSidebar';

import styles from '../../styles/SaleRecords.module.css';
import { GetServerSideProps } from 'next';
import { checkRBACRedirect } from '../../lib/redirect';
import { Occupation } from '../../model/identityaccess/domain/employee';
import { getToken } from '../../lib/jwt';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import { SaleReceiptBrief } from '../api/finance/sale-receipts';
import { fetcher } from '../../lib/swr';
import useSWR from 'swr';
import Button from '../../components/Button/Button';

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

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (!pageNumHook.error && pageNumHook.data && pageIndex >= pageNumHook.data) return null;
    return `/api/finance/sale-receipts?page=${pageIndex + 1}`;
  };

  let { data, error, size, setSize } = useSWRInfinite<SaleReceiptBrief[]>(getKey, fetcher);
  if (error) return <div>Không thể kết nối đến máy chủ</div>;
  if (!data) return <div>Đang tải...</div>;

  return (
    <>
      <ul className={styles.receiptList}>
        {data.map((receiptList, index) => {
          return receiptList.map((receipt) => (
            <li className={styles.receiptItem} key={receipt.id}>
              <div>{new Date(receipt.createdDate).toLocaleDateString()}</div>
              <div>{receipt.price}</div>
            </li>
          ));
        })}
      </ul>
      <div className={styles.bottomRow}>
        <Button onClick={() => setSize(size + 1)}>Load More</Button>
      </div>
    </>
  );
}
