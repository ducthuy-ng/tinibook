import { Sidebar, SidebarItem } from '../Sidebar';
import { Dispatch, SetStateAction } from 'react';

export default function ShopManagementSidebar(props: {
  isDisplay: boolean;
  setDisplayStatus: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Sidebar isDisplay={props.isDisplay} setDisplayStatus={props.setDisplayStatus}>
      <SidebarItem href={'/'}>Sách tại của hàng</SidebarItem>
      <SidebarItem href={'/search-book'}>Tìm kiếm sách</SidebarItem>
      <SidebarItem href={'shop-manager/import-book'}>Nhập sách</SidebarItem>
      <SidebarItem href={'/shop-manager/sale-records'}>Lịch sử bán hàng</SidebarItem>
    </Sidebar>
  );
}
