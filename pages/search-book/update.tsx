import { TokenType } from '../../model/identityaccess/authService';
import { ParsedUrlQuery } from 'querystring';
import Input, { useInputHook } from '../../components/Input/Input';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import styles from '../../styles/SearchBook.module.css';
import specificStyles from '../../styles/AddBooks.module.css';
import StorageManagerSidebar from '../../components/Sidebar/Specifics/StorageManagerSidebar';
import Button from '../../components/Button/Button';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { checkRBACRedirect } from '../../lib/redirect';
import { Occupation } from '../../model/identityaccess/domain/employee';
import { getToken } from '../../lib/jwt';
import { useRouter } from 'next/router';
import Popup, { usePopup } from '../../components/Popup/Popup';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '../../lib/swr';
import { Book } from '../../model/bookMngt/domain/Book';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect = checkRBACRedirect(context, Occupation.STORAGE_MANAGER);
  if (redirect) return redirect;

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

export default function UpdateBook(props: { token: TokenType; query: ParsedUrlQuery }) {
  const headerHook = useHeaderWithSidebarHook();
  const popupHook = usePopup();
  const router = useRouter();

  let queryISBN = props.query['isbn'];
  if (Array.isArray(queryISBN)) queryISBN = queryISBN[0];

  const isbn = useInputHook(queryISBN);
  const name = useInputHook();
  const type = useInputHook();
  const author = useInputHook();
  const coverUrl = useInputHook();
  const publisher = useInputHook();
  const price = useInputHook();
  const pagesNum = useInputHook();

  const nameChangeValue = name.changeValue;
  const typeChangeValue = type.changeValue;
  const authorChangeValue = author.changeValue;
  const coverUrlChangeValue = coverUrl.changeValue;
  const publisherChangeValue = publisher.changeValue;
  const priceChangeValue = price.changeValue;
  const pagesNumChangeValue = pagesNum.changeValue;

  const { data, error } = useSWRImmutable<Book>(`/api/storage/books/${queryISBN}`, fetcher);
  const isLoading = error || !data;
  useEffect(() => {
    if (!data) return;

    nameChangeValue(data['name']);
    typeChangeValue(data['type']);
    authorChangeValue(data['author']);
    coverUrlChangeValue(data['coverUrl']);
    publisherChangeValue(data['publisher']);
    priceChangeValue(String(data['price']));
    pagesNumChangeValue(String(data['pagesNum'] || 0));
  }, [
    authorChangeValue,
    coverUrlChangeValue,
    data,
    nameChangeValue,
    pagesNumChangeValue,
    priceChangeValue,
    publisherChangeValue,
    typeChangeValue,
  ]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const body = {
      isbn: isbn.value,
      name: name.value,
      type: type.value,
      author: author.value,
      coverUrl: coverUrl.value,
      publisher: publisher.value,
      price: price.value,
      pagesNum: pagesNum.value,
    };

    const resp = await fetch(`/api/storage/books/${queryISBN}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    switch (resp.status) {
      case 200:
        popupHook.setShowingState(true);
        popupHook.setCurrentVariant('success');
        popupHook.setMessage('Ghi nh???n th??nh c??ng');
        return;

      case 500:
        popupHook.setShowingState(true);
        popupHook.setCurrentVariant('warning');
        popupHook.setMessage('L???i h??? th???ng, xin th??? l???i sau.');
        return;

      default:
        const body = await resp.json();
        popupHook.setShowingState(true);
        popupHook.setCurrentVariant('warning');
        popupHook.setMessage(body['message']);
    }
  };

  return (
    <div className={styles.container}>
      <HeaderWithSidebar hook={headerHook} token={props.token} sidebar={StorageManagerSidebar} />
      <div className={styles.title_row}>
        <h2>C???p nh???t ?????u s??ch</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={specificStyles.value_row}>
          <label htmlFor={'isbn'}>
            <p>ISBN:</p>
          </label>
          <Input id={'isbn'} inputHook={isbn} disabled={true} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'name'}>
            <p>T??n s??ch:</p>
          </label>
          <Input id={'name'} inputHook={name} disabled={true} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'type'}>
            <p>Th??? lo???i:</p>
          </label>
          <Input id={'type'} inputHook={type} disabled={isLoading} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'author'}>
            <p>T??c gi???:</p>
          </label>
          <Input id={'author'} inputHook={author} disabled={isLoading} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'coverUrl'}>
            <p>Th??? lo???i:</p>
          </label>
          <Input id={'coverUrl'} inputHook={coverUrl} disabled={isLoading} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'publisher'}>
            <p>Nh?? xu???t b???n:</p>
          </label>
          <Input id={'publisher'} inputHook={publisher} disabled={isLoading} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'price'}>
            <p>Gi?? b??a:</p>
          </label>
          <Input id={'price'} inputHook={price} disabled={true} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'pagesNum'}>
            <p>S??? trang:</p>
          </label>
          <Input id={'pagesNum'} inputHook={pagesNum} disabled={isLoading} />
        </div>
        <div className={specificStyles.action_row}>
          <Button type={'button'} onClick={() => router.back()}>
            Quay l???i
          </Button>
          <Button type={'submit'}>L??u</Button>
        </div>
      </form>
      <Popup popupHook={popupHook} />
    </div>
  );
}
