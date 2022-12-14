import { TokenType } from '../../model/identityaccess/authService';
import { ParsedUrlQuery } from 'querystring';
import Input, { useInputHook } from '../../components/Input/Input';
import HeaderWithSidebar, { useHeaderWithSidebarHook } from '../../components/HeaderWithSidebar/HeaderWithSidebar';
import styles from '../../styles/SearchBook.module.css';
import specificStyles from '../../styles/AddBooks.module.css';
import StorageManagerSidebar from '../../components/Sidebar/Specifics/StorageManagerSidebar';
import Button from '../../components/Button/Button';
import React from 'react';
import { GetServerSideProps } from 'next';
import { checkRBACRedirect } from '../../lib/redirect';
import { Occupation } from '../../model/identityaccess/domain/employee';
import { getToken } from '../../lib/jwt';
import { useRouter } from 'next/router';
import Popup, { usePopup } from '../../components/Popup/Popup';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirect = checkRBACRedirect(context, Occupation.STORAGE_MANAGER);
  if (redirect) return redirect;

  const token = getToken(context);
  return {
    props: {
      token: token,
      query: context.query,
    },
  };
};

export default function AddBook(props: { token: TokenType; query: ParsedUrlQuery }) {
  const headerHook = useHeaderWithSidebarHook();
  const popupHook = usePopup();
  const router = useRouter();

  const isbn = useInputHook();
  const name = useInputHook();
  const type = useInputHook();
  const author = useInputHook();
  const coverUrl = useInputHook();
  const publisher = useInputHook();
  const price = useInputHook();
  const pagesNum = useInputHook();

  const cleanup = () => {
    isbn.changeValue('');
    name.changeValue('');
    type.changeValue('');
    author.changeValue('');
    coverUrl.changeValue('');
    publisher.changeValue('');
    price.changeValue('');
    pagesNum.changeValue('');
  };

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

    const resp = await fetch('/api/storage/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    switch (resp.status) {
      case 200:
        cleanup();
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
        <h2>T???o ?????u s??ch</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={specificStyles.value_row}>
          <label htmlFor={'isbn'}>
            <p>ISBN:</p>
          </label>
          <Input id={'isbn'} inputHook={isbn} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'name'}>
            <p>T??n s??ch:</p>
          </label>
          <Input id={'name'} inputHook={name} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'type'}>
            <p>Th??? lo???i:</p>
          </label>
          <Input id={'type'} inputHook={type} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'author'}>
            <p>T??c gi???:</p>
          </label>
          <Input id={'author'} inputHook={author} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'coverUrl'}>
            <p>Th??? lo???i:</p>
          </label>
          <Input id={'coverUrl'} inputHook={coverUrl} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'publisher'}>
            <p>Nh?? xu???t b???n:</p>
          </label>
          <Input id={'publisher'} inputHook={publisher} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'price'}>
            <p>Gi?? b??a:</p>
          </label>
          <Input id={'price'} inputHook={price} />
        </div>
        <div className={specificStyles.value_row}>
          <label htmlFor={'pagesNum'}>
            <p>S??? trang:</p>
          </label>
          <Input id={'pagesNum'} inputHook={pagesNum} />
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
