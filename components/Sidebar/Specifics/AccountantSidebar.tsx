import { Sidebar, SidebarItem } from '../Sidebar';
import { Dispatch, SetStateAction } from 'react';

export default function AccountantSidebar(props: {
  isDisplay: boolean;
  setDisplayStatus: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Sidebar isDisplay={props.isDisplay} setDisplayStatus={props.setDisplayStatus}>
      <SidebarItem href={'/search-book'}>Tìm kiếm sách</SidebarItem>
      <SidebarItem href={'/'}>Số liệu</SidebarItem>
      <SidebarItem href={'/accountant/human-resources'}>Danh sách nhân viên</SidebarItem>
      {/*<SidebarItem href={'/'}>Thu chi</SidebarItem>*/}
    </Sidebar>
  );
}
