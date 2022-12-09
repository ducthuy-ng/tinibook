// import React, { useState } from "react";
// import Button from "../../components/Button/Button";
// import EnterBookModal from "../../components/Modal/BookModal/EnterBookModal";
// import MoveBookModal from "../../components/Modal/BookModal/MoveBookModal";
// import Header from "../../components/Header/Header";
// import StorageManagerSidebar from "../../components/Sidebar/Specifics/StorageManagerSidebar";
//
// import styles from "../../styles/StockManager.module.css";
// import Table from "../../components/Table/Table";
// import Title from "../../components/Title/Title";
// import { fetcher } from "../../lib/fetch";
// import useSWR from "swr";
// import { parseCookies } from "nookies";
// import { checkRBACRedirect } from "../../lib/redirect";
// import jwt from "jsonwebtoken";
//
// export function getServerSideProps(ctx) {
//   const apiToken = parseCookies(ctx)["API_TOKEN"];
//   const token = jwt.decode(apiToken);
//   const redirect = checkRBACRedirect(apiToken, "STORAGE_MANAGER");
//
//   if (redirect) return redirect;
//
//   return {
//     props: {
//       assignedBuilding: token.assignedBuilding,
//     },
//   };
// }
//
// export default function ManageInventory({ assignedBuilding }) {
//   // const apiToken = parseCookies()["API_TOKEN"];
//   // const router = useRouter();
//
//   // const searchBarInput = (event) => {
//   //   if (event.key === "Enter") {
//   //     router.push(`/storage-manager?bookName=${encodeURIComponent(event.target.value)}`);
//   //   }
//   // };
//
//   const { data, error } = useSWR(`/storage/get-all-book-from-building?buildingId=${assignedBuilding}`, fetcher);
//
//   const [addBookModalDisplay, setAddBookModalDisplay] = useState(false);
//   const [moveBookModalDisplay, setMoveBookModalDisplay] = useState(false);
//   const [displaySideBar, setDisplaySidebar] = useState(false);
//   const addBook = (
//     <Button
//       className={styles.add_item_btn}
//       onClick={() => {
//         setAddBookModalDisplay(true);
//       }}
//     >
//       Nhập sách
//     </Button>
//   );
//
//   return (
//     <div>
//       <Header setDisplaySidebar={setDisplaySidebar} />
//       <StorageManagerSidebar displayStatus={displaySideBar} setDisplayStatus={setDisplaySidebar} />
//
//       <Title title={"Sách tồn kho"} actionBtn={addBook}></Title>
//       <BookTable data={data} error={error} />
//
//       <MoveBookModal
//         displayMoveBookModalState={moveBookModalDisplay}
//         setMoveBookModalDisplayState={setMoveBookModalDisplay}
//       />
//       <EnterBookModal displayState={addBookModalDisplay} setDisplayState={setAddBookModalDisplay} />
//     </div>
//   );
// }
//
// function BookTable({ data, error }) {
//   if (error) return <div>Không thể kết nối đến máy chủ</div>;
//   if (!data) return <div>Đang tải</div>;
//
//   return (
//     <Table>
//       <thead>
//         <tr>
//           <th>Tên sách</th>
//           {/*<th>ISBN</th>*/}
//           {/*<th>Thể loại</th>*/}
//           <th>Số lượng</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((book) => (
//           <tr key={book["bookId"]}>
//             <td>{book["bookName"]}</td>
//             {/*<td>{}</td>*/}
//             {/*<td>{book['bookName']}</td>*/}
//             <td>{book["amount"]}</td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// }

import { checkRBACRedirect } from '../../lib/redirect';
import useSWR from 'swr';
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
import StorageManagerSidebar from '../../components/Sidebar/Specifics/StorageManagerSidebar';
import BookTransferModal, {
  BookTransferHook,
  useBookTransfer,
} from '../../components/Modal/BookTransferModal/BookTransferModal';
import Popup, { usePopup } from '../../components/Popup/Popup';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = checkRBACRedirect(ctx, Occupation.STORAGE_MANAGER);
  if (redirect) return redirect;

  const token = getToken(ctx);

  return {
    props: {
      token: token,
      query: ctx.query,
    },
  };
};

const StorageManager = (props: { token: TokenType; query: ParsedUrlQuery }) => {
  let bookName = props.query['book_name'] || '';
  if (Array.isArray(bookName)) bookName = bookName[0];

  const headerHook = useHeaderWithSidebarHook();

  const searchBookName = useInputHook(bookName);
  const paging = usePagination();

  const popupHook = usePopup();
  const bookTransferHook = useBookTransfer();

  return (
    <>
      <form className={styles.container}>
        <HeaderWithSidebar hook={headerHook} sidebar={StorageManagerSidebar} token={props.token} />

        <div className={styles.title_row}>
          <h1 className={styles.title}>Sách tồn kho {props.token.assignedBuilding}</h1>
          <Searchbar name={'book_name'} placeholder={'Nhập tên sách cần tìm...'} inputHook={searchBookName} />
          <input type={'submit'} hidden={true} />
        </div>
        <BookDisplay token={props.token} bookName={bookName} page={paging.page} bookTransferHook={bookTransferHook} />
        <Pagination
          paginationHook={paging}
          maxPageUrl={`/api/storage/books/at-building/${props.token.assignedBuilding}?book_name=${encodeURIComponent(
            bookName
          )}&maxPage=true`}
        />
      </form>
      <BookTransferModal hook={bookTransferHook} currentBuilding={props.token.assignedBuilding} popupHook={popupHook} />
      <Popup popupHook={popupHook} />
    </>
  );
};

function BookDisplay(props: { token: TokenType; bookName: string; page: number; bookTransferHook: BookTransferHook }) {
  const itemLimitPerPage = 10;

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
          key={book.id}
          id={book.id}
          name={book.name}
          coverUrl={book.coverUrl}
          amount={book.amount}
          onClick={() => {
            props.bookTransferHook.modalHook.setDisplayState(true);
            props.bookTransferHook.setSelectedISBN(book['isbn']);
          }}
        />
      ))}
    </div>
  );
}

export default StorageManager;
