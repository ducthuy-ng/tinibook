import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import logo from '../../public/logo.png';
import styles from './Header.module.css';
import Link from 'next/link';
import { AccountBox } from '@mui/icons-material';

function HeaderCustomer() {
  return (
    <header className={classNames(styles.header)}>
      <></>
      <div className={styles.header_logo_wrapper}>
        <Image className={styles.header_logo} src={logo} alt="logo" fill={true} />
      </div>
      <Link href={'/login'}>
        <div className={styles.user_info}>
          <AccountBox className={styles.avatar} />
          <div className={styles.user_name}>Đăng nhập</div>
        </div>
      </Link>
    </header>
  );
}

export default HeaderCustomer;
