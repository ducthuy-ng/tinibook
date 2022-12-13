import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './Pagination.module.css';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type PaginationHook = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export function usePagination(): PaginationHook {
  const [page, setPage] = useState(1);
  return { page, setPage };
}

function PaginationItem(props: {
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  isActive?: boolean;
  disable?: boolean;
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    // <Link href={disable ? '/' : href} prefetch={false}>
    <a
      onClick={props.onClick}
      className={classNames(
        styles.pagination_item,
        props.disable ? styles.disabled : '',
        props.isActive ? styles.active : ''
      )}
    >
      {props.children}
    </a>
    // </Link>
  );
}

function Pagination(props: { paginationHook: PaginationHook; maxPage?: number; maxPageUrl?: string }) {
  const maxPage = props.maxPage || 20;

  return (
    <div className={styles.pagination}>
      <PaginationItem
        disable={props.paginationHook.page == 1}
        onClick={() => props.paginationHook.setPage(props.paginationHook.page - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </PaginationItem>

      <PaginationItem>{props.paginationHook.page}</PaginationItem>

      <PaginationItem onClick={() => props.paginationHook.setPage(props.paginationHook.page + 1)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </PaginationItem>
    </div>
  );
}

export default Pagination;
