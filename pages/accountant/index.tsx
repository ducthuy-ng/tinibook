import { TokenType } from '../../model/identityaccess/authService';
import { ParsedUrlQuery } from 'querystring';

export default function Accountant(props: { token: TokenType; query: ParsedUrlQuery }) {
  return <div>This is the accountant page</div>;
}
