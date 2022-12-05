import React, { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames';
import styles from './Sidebar.module.css';
import Link from 'next/link';

function Sidebar(props: { isDisplay: boolean; setDisplayStatus: Dispatch<SetStateAction<boolean>>; children?: any }) {
  return (
    <nav className={classNames(styles.sidebar, props.isDisplay ? styles.sidebar_show : '')}>
      <div className={styles.close_icon_div}>
        <CloseIcon
          className={styles.close_icon}
          onClick={() => {
            props.setDisplayStatus(false);
          }}
        />
      </div>
      {props.children}
    </nav>
  );
}

function SidebarItem(props: { href: URL | string; children: any }) {
  return (
    <Link href={props.href}>
      <div className={styles.sidebar_item}>{props.children}</div>
    </Link>
  );
}

export { Sidebar, SidebarItem };
