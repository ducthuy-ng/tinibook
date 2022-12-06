import React, { Dispatch, SetStateAction, useState } from 'react';
import Header from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { TokenType } from '../../model/identityaccess/authService';

export type HeaderWithSidebarHook = {
  sidebarIsDisplay: boolean;
  setSidebarDisplayStatus: Dispatch<SetStateAction<boolean>>;
};

export const useHeaderWithSidebarHook = (): HeaderWithSidebarHook => {
  const [sidebarIsDisplay, setSidebarDisplayStatus] = useState(false);

  return {
    sidebarIsDisplay,
    setSidebarDisplayStatus,
  };
};

const HeaderWithSidebar = (props: {
  className?: string;
  token: TokenType;
  hook: HeaderWithSidebarHook;
  sidebar: typeof Sidebar;
}) => {
  return (
    <>
      <Header
        className={props.className}
        setSidebarDisplayStatus={props.hook.setSidebarDisplayStatus}
        token={props.token}
      />
      <props.sidebar isDisplay={props.hook.sidebarIsDisplay} setDisplayStatus={props.hook.setSidebarDisplayStatus} />
    </>
  );
};

export default HeaderWithSidebar;
