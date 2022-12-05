import { Sidebar, SidebarItem } from '../Sidebar';
import { Dispatch, SetStateAction } from 'react';

export default function StorageManagerSidebar(props: {
  isDisplay: boolean;
  setDisplayStatus: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Sidebar isDisplay={props.isDisplay} setDisplayStatus={props.setDisplayStatus}>
      <SidebarItem href={'/'}>Sách tồn kho</SidebarItem>
      <SidebarItem href={'/storage-manager/import'}>Nhập sách</SidebarItem>
      <SidebarItem href={'/search-book'}>Tìm kiếm sách</SidebarItem>
    </Sidebar>
  );
}
