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
            <Link key={receipt.id} href={`/shop-manager/sale-records/detail?id=${receipt.id}`}>
              <li className={styles.receiptItem}>
                <div>{new Date(receipt.createdDate).toLocaleDateString()}</div>
                <div>{receipt.price}</div>
              </li>
            </Link>
          ));
        })}
      </ul>
      <div className={styles.bottomRow}>
        <Button onClick={() => setSize(size + 1)}>Load More</Button>
      </div>
    </>
  );
}
