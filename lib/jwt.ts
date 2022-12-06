import jwt from 'jsonwebtoken';
import { TokenType } from '../model/identityaccess/authService';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { parseCookies } from 'nookies';

export const verify = (token: string): TokenType => {
  if (!process.env.SIGN_KEY) {
    throw new Error('SIGN_KEY must be specified');
  }

  return jwt.verify(token, process.env.SIGN_KEY) as TokenType;
};

export const decode = (token: string): TokenType => {
  return jwt.decode(token) as TokenType;
};

export function getToken(ctx?: GetServerSidePropsContext | { req: NextApiRequest }) {
  const cookies = parseCookies(ctx);
  if (!cookies['API_TOKEN']) return null;

  try {
    return verify(cookies['API_TOKEN']);
  } catch (e) {
    return null;
  }
}
