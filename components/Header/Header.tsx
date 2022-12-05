import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { AccountBox } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '../Button/Button';

import logo from '../../public/logo.png';
import styles from './Header.module.css';
import { TokenType } from '../../model/identityaccess/authService';

type Props = {
  token: TokenType;
  hideMenuButton?: boolean;
  setSidebarDisplayStatus: Dispatch<SetStateAction<boolean>>;
};

function Header(props: Props) {
  return (
    <header className={classNames(styles.header)}>
      {props.hideMenuButton ? <></> : <MenuButton onClick={() => props.setSidebarDisplayStatus(true)} />}
      <div className={styles.header_logo_wrapper}>
        <Image className={styles.header_logo} src={logo} alt="logo" fill={true} />
      </div>
      <div className={styles.user_info}>
        <AccountBox className={styles.avatar} />
        <div className={styles.user_name}>{props.token.employeeName}</div>
      </div>
    </header>
  );
}

type MenuButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function MenuButton(props: MenuButtonProps) {
  return (
    <Button type={'button'} className={styles.menu_button} onClick={props.onClick}>
      <MenuIcon />
    </Button>
  );
}

export default Header;
