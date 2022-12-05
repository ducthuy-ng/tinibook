import { Occupation } from '../model/identityaccess/domain/employee';
import { destroyCookie, parseCookies } from 'nookies';
import { verify } from './jwt';
import { GetServerSidePropsContext } from 'next';

export function checkRBACRedirect(context: GetServerSidePropsContext, expectedOccupation: Occupation) {
  const cookies = parseCookies(context);

  if (!cookies['API_TOKEN'])
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  let token;
  try {
    token = verify(cookies['API_TOKEN']);
  } catch (e) {
    destroyCookie(context, 'API_TOKEN');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Staff can only go to cashier page
  // if (token.occupation == Occupation.STAFF && expectedOccupation != Occupation.STAFF) {
  //   return {
  //     redirect: {
  //       destination: '/cashier',
  //       permanent: false,
  //     },
  //   };
  // }

  if (token.occupation != expectedOccupation)
    return {
      redirect: {
        destination: '/invalid-role',
        permanent: false,
      },
    };

  return null;
}
