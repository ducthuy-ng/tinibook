import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import styles from './Sidebar.module.css';
import Link from 'next/link';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebar(props: { isDisplay: boolean; setDisplayStatus: Dispatch<SetStateAction<boolean>>; children?: any }) {
  return (
    <nav className={classNames(styles.sidebar, props.isDisplay ? styles.sidebar_show : '')}>
      <div className={styles.close_icon_div}>
        <FontAwesomeIcon
          icon={faClose}
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
