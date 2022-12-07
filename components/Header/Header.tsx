import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { AccountBox } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '../Button/Button';

import logo from '../../public/logo.png';
import styles from './Header.module.css';
import { TokenType } from '../../model/identityaccess/authService';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
  token: TokenType;
  hideMenuButton?: boolean;
  setSidebarDisplayStatus: Dispatch<SetStateAction<boolean>>;
};

function Header(props: Props) {
  const dropdownHook = useDropdownHook();

  return (
    <header className={classNames(props.className, styles.header)}>
      {props.hideMenuButton ? <></> : <MenuButton onClick={() => props.setSidebarDisplayStatus(true)} />}
      <div className={styles.header_logo_wrapper}>
        <Image className={styles.header_logo} src={logo} alt="logo" fill={true} />
      </div>
      <div
        className={styles.user_info}
        onClick={() => {
          dropdownHook.setShowingState(!dropdownHook.isShowing);
        }}
      >
        <AccountBox className={styles.avatar} />
        <div className={styles.user_name}>{props.token.employeeName}</div>
        <UserDropdown hook={dropdownHook} token={props.token} />
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

interface DropdownHook {
  isShowing: boolean;
  setShowingState: Dispatch<SetStateAction<boolean>>;
}

function useDropdownHook(): DropdownHook {
  const [isShowing, setShowingState] = useState(false);
  return { isShowing, setShowingState };
}

function UserDropdown(props: { hook: DropdownHook; token: TokenType }) {
  const router = useRouter();
  return (
    <>
      <div
        className={classNames(
          styles.dropdown_background,
          props.hook.isShowing ? styles.dropdown_background_show : styles.dropdown_background_hide
        )}
      />

      <div
        className={classNames(
          styles.user_dropdown,
          props.hook.isShowing ? styles.dropdown_background_show : styles.dropdown_background_hide
        )}
        onClick={(event) => {
          fetch('/api/identity-access/logout').then(() => {
            router.push('/login');
          });
        }}
      >
        Đăng xuất
      </div>
    </>
  );
}

export default Header;
