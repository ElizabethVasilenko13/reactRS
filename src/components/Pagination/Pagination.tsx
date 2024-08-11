'use client';

import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PageInfo } from '@models/rick-and-morty-api.interface';
import styles from './Pagination.module.scss';

type PaginationProps = {
  pageInfo: PageInfo;
};

const Pagination: React.FC<PaginationProps> = ({ pageInfo }) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const router = useRouter();

  const handlePageChange = (newPageNum: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', newPageNum.toString());

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className={classNames(styles.pagination, styles[theme])}>
      <button type="button" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        &lt;
      </button>
      {currentPage || 1}
      <button type="button" disabled={currentPage === pageInfo.pages} onClick={() => handlePageChange(currentPage + 1)}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
