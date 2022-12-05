import { Sidebar, SidebarItem } from '../Sidebar';
import { Dispatch, SetStateAction } from 'react';

export default function CashierSidebar(props: {
  isDisplay: boolean;
  setDisplayStatus: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Sidebar isDisplay={props.isDisplay} setDisplayStatus={props.setDisplayStatus}>
      <SidebarItem href={'/'}>Trang chủ</SidebarItem>
      <SidebarItem href={'/search-book'}>Tìm kiếm sách</SidebarItem>
    </Sidebar>
  );
}
