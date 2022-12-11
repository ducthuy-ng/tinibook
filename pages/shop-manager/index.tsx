import { checkRBACRedirect } from '../../lib/redirect';
import useSWR, { SWRResponse } from 'swr';
import React from 'react';
import styles from '../../styles/SearchBook.module.css';
import { GetServerSideProps } from 'next';
import { Occupation } from '../../model/identityaccess/domain/employee';
import { useInputHook } from '../../components/Input/Input';
import Pagination, { usePagination } from '../../components/Pagination/Pagination';
import Searchbar from '../../components/Searchbar/Searchbar';
import { fetcher } from '../../lib/swr';
import BookCard from '../../components/BookCard/BookCard';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import ShopManagementSidebar from '../../components/Sidebar/Specifics/ShopManagerSidebar';

import { TokenType } from '../../model/identityaccess/authService';
import { getToken } from '../../lib/jwt';
import { SpecificLocationFuzzySearchResult } from '../api/storage/books/at-building/[building-id]';
import { ParsedUrlQuery } from 'querystring';
import BookTransferModal, {
  BookTransferHook,
  useBookTransfer,
} from '../../components/Modal/BookTransferModal/BookTransferModal';
import Popup, { usePopup } from '../../components/Popup/Popup';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = checkRBACRedirect(ctx, Occupation.SHOP_MANAGER);
  if (redirect) return redirect;

  const token = getToken(ctx);

  return {
    props: {
      token: token,
      query: ctx.query,
    },
  };
};

const itemLimitPerPage = 10;

const ShopManager = (props: { token: TokenType; query: ParsedUrlQuery }) => {
  let bookName = props.query['book_name'] || '';
  if (Array.isArray(bookName)) bookName = bookName[0];

  const headerHook = useHeaderWithSidebarHook();

  const searchBookName = useInputHook(bookName);
  const paging = usePagination();

  const bookTransferHook = useBookTransfer();
  const popupHook = usePopup();

  const bookData = useSWR<SpecificLocationFuzzySearchResult[]>(
    `/api/storage/books/at-building/${props.token.assignedBuilding}?book_name=${encodeURIComponent(bookName)}&page=${
      paging.page
    }&limit=${itemLimitPerPage}`,
    fetcher
  );

  return (
    <>
      <form className={styles.container}>
        <HeaderWithSidebar hook={headerHook} sidebar={ShopManagementSidebar} token={props.token} />

        <div className={styles.title_row}>
          <h1 className={styles.title}>Sách tại cửa hàng </h1>
          <Searchbar name={'book_name'} placeholder={'Nhập tên sách cần tìm...'} inputHook={searchBookName} />
          <input type={'submit'} hidden={true} />
        </div>
        <BookDisplay token={props.token} bookData={bookData} bookTransferHook={bookTransferHook} />
        <Pagination
          paginationHook={paging}
          maxPageUrl={`/api/storage/books/at-building/${props.token.assignedBuilding}?book_name=${encodeURIComponent(
            bookName
          )}&maxPage=true`}
        />
      </form>
      <BookTransferModal
        hook={bookTransferHook}
        currentBuilding={props.token.assignedBuilding}
        popupHook={popupHook}
        mutateFn={bookData.mutate}
      />
      <Popup popupHook={popupHook} />
    </>
  );
};

function BookDisplay(props: {
  token: TokenType;
  bookData: SWRResponse<SpecificLocationFuzzySearchResult[]>;
  bookTransferHook: BookTransferHook;
}) {
  if (props.bookData.error) return <div className={styles.contents}>Lỗi kết nối đến hệ thống</div>;
  if (!props.bookData.data) return <div className={styles.contents}>Đang tải...</div>;

  return (
    <div className={styles.contents}>
      {props.bookData.data.map((book) => (
        <BookCard
          key={book['id']}
          id={book['id']}
          name={book['name']}
          amount={book['amount']}
          coverUrl={book['coverUrl']}
          onClick={() => {
            props.bookTransferHook.modalHook.setDisplayState(true);
            props.bookTransferHook.setSelectedISBN(book['isbn']);
          }}
        />
      ))}
    </div>
  );
}

export default ShopManager;
