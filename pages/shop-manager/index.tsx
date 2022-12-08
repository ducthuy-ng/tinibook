import { checkRBACRedirect } from '../../lib/redirect';
import useSWR from 'swr';
import React from 'react';
import styles from '../../styles/SearchBook.module.css';
import { GetServerSideProps } from 'next';
import { Occupation } from '../../model/identityaccess/domain/employee';
import { useRouter } from 'next/router';
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

const ShopManager = (props: { token: TokenType; query: ParsedUrlQuery }) => {
  let bookName = props.query['book_name'] || '';
  if (Array.isArray(bookName)) bookName = bookName[0];

  const headerHook = useHeaderWithSidebarHook();

  const searchBookName = useInputHook(bookName);
  const paging = usePagination();

  return (
    <form className={styles.container}>
      <HeaderWithSidebar hook={headerHook} sidebar={ShopManagementSidebar} token={props.token} />

      <div className={styles.title_row}>
        <h1 className={styles.title}>Sách tại cửa hàng</h1>
        <Searchbar name={'book_name'} placeholder={'Nhập tên sách cần tìm...'} inputHook={searchBookName} />
        <input type={'submit'} hidden={true} />
      </div>
      <BookDisplay token={props.token} bookName={bookName} page={paging.page} />
      <Pagination
        paginationHook={paging}
        maxPageUrl={`/api/storage/books/at-building/${props.token.assignedBuilding}?book_name=${encodeURIComponent(
          bookName
        )}&maxPage=true`}
      />
    </form>
  );
};

function BookDisplay(props: { token: TokenType; bookName: string; page: number }) {
  const itemLimitPerPage = 10;
  const router = useRouter();

  const { data, error } = useSWR(
    `/api/storage/books/at-building/${props.token.assignedBuilding}?book_name=${encodeURIComponent(
      props.bookName
    )}&page=${props.page}&limit=${itemLimitPerPage}`,
    fetcher
  );

  if (error) return <div className={styles.contents}>Lỗi kết nối đến hệ thống</div>;
  if (!data) return <div className={styles.contents}>Đang tải...</div>;

  return (
    <div className={styles.contents}>
      {(data as SpecificLocationFuzzySearchResult[]).map((book) => (
        <BookCard
          key={book['id']}
          id={book['id']}
          name={book['name']}
          amount={book['amount']}
          coverUrl={book['coverUrl']}
          // onClick={() => router.push(`/search-book/detail?isbn=${book['isbn']}`)}
        />
      ))}
    </div>
  );
}

export default ShopManager;
