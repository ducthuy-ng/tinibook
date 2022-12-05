import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Occupation } from '../model/identityaccess/domain/employee';
import Cashier from './cashier';
import SearchBook from './search-book';
import ShopManager from './shop-manager';

import { TokenType } from '../model/identityaccess/authService';
import { getToken } from '../lib/jwt';
import StorageManager from './storage-manager';
import { ParsedUrlQuery } from 'querystring';
import Accountant from './accountant';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getToken(context);
  return {
    props: {
      token: token,
      query: context.query,
    },
  };
};

const Home: NextPage<{ token?: TokenType; query: ParsedUrlQuery }> = (props) => {
  if (!props.token) return <SearchBook query={props.query} />;

  switch (props.token.occupation) {
    case Occupation.STAFF:
      return <Cashier token={props.token} query={props.query} />;
    case Occupation.SHOP_MANAGER:
      return <ShopManager token={props.token} query={props.query} />;
    case Occupation.STORAGE_MANAGER:
      return <StorageManager token={props.token} query={props.query} />;
    case Occupation.ACCOUNTANT:
      return <Accountant token={props.token} query={props.query} />;
    default:
      return <SearchBook query={props.query} />;
  }
};

export default Home;
