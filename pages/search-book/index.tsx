import React from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';
import styles from '../../styles/SearchBook.module.css';
import { useInputHook } from '../../components/Input/Input';
import { useRouter } from 'next/router';
import { fetcher } from '../../lib/swr';
import Pagination, { usePagination } from '../../components/Pagination/Pagination';
import useSWR from 'swr';
import { FuzzySearchResult } from '../../model/bookMngt/domain/Book';
import BookCard from '../../components/BookCard/BookCard';
import { TokenType } from '../../model/identityaccess/authService';
import { Occupation } from '../../model/identityaccess/domain/employee';
import AccountantSidebar from '../../components/Sidebar/Specifics/AccountantSidebar';
import ShopManagementSidebar from '../../components/Sidebar/Specifics/ShopManagerSidebar';
import StorageManagerSidebar from '../../components/Sidebar/Specifics/StorageManagerSidebar';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import HeaderCustomer from '../../components/Header/HeaderCustomer';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { getToken } from '../../lib/jwt';
import Button from '../../components/Button/Button';

const selectHeaderForOccupation: Map<Occupation, any> = new Map([
  [Occupation.STAFF, AccountantSidebar],
  [Occupation.SHOP_MANAGER, ShopManagementSidebar],
  [Occupation.STORAGE_MANAGER, StorageManagerSidebar],
  [Occupation.ACCOUNTANT, AccountantSidebar],
]);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getToken(context);
  return {
    props: {
      token: token,
      query: context.query,
    },
  };
};

const SearchBook = (props: { token?: TokenType; query?: ParsedUrlQuery }) => {
  let bookName = props.query ? props.query['book_name'] || '' : '';
  if (Array.isArray(bookName)) bookName = bookName[0];

  const searchBookName = useInputHook(bookName);
  const paging = usePagination();
  const sidebarHook = useHeaderWithSidebarHook();
  const router = useRouter();

  return (
    <div className={styles.container}>
      {props.token ? (
        <HeaderWithSidebar
          hook={sidebarHook}
          sidebar={selectHeaderForOccupation.get(props.token.occupation)}
          token={props.token}
        />
      ) : (
        <HeaderCustomer />
      )}
      <form className={styles.title_row}>
        <h1 className={styles.title}>S??ch</h1>
        <Searchbar name={'book_name'} placeholder={'Nh???p t??n s??ch c???n t??m...'} inputHook={searchBookName} />
        {props.token?.occupation == Occupation.STORAGE_MANAGER ? (
          <Button type={'button'} onClick={() => router.push('/search-book/add')}>
            T???o s??ch
          </Button>
        ) : null}
        <input type={'submit'} hidden={true} />
      </form>
      <BookDisplay bookName={bookName} page={paging.page} />
      <Pagination
        paginationHook={paging}
        maxPageUrl={`/api/storage/books/search-book?book_name=${encodeURIComponent(bookName)}&maxPage=true`}
      />
    </div>
  );
};

function BookDisplay(props: { bookName: string; page: number }) {
  const itemLimitPerPage = 10;
  const router = useRouter();

  const { data, error } = useSWR(
    `/api/storage/books/search-book?book_name=${props.bookName}&page=${props.page}&limit=${itemLimitPerPage}`,
    fetcher
  );

  if (error) return <div className={styles.contents}>L???i k???t n???i ?????n h??? th???ng</div>;
  if (!data) return <div className={styles.contents}>??ang t???i...</div>;

  return (
    <div className={styles.contents}>
      {(data as FuzzySearchResult[]).map((book) => (
        <BookCard
          key={book['id']}
          id={book['id']}
          name={book['name']}
          coverUrl={book['coverUrl']}
          onClick={() => router.push(`/search-book/detail?isbn=${book['isbn']}`)}
        />
      ))}
    </div>
  );
}

export default SearchBook;
