import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { PageInfo } from '@models/rick-and-morty-api.interface';
import styles from './Pagination.module.scss';

type PaginationProps = {
  pageInfo: PageInfo;
};

const Pagination: React.FC<PaginationProps> = ({ pageInfo }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const currentPage = Number(router.query.page) ?? 1;

  const handlePageChange = (newPageNum: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPageNum },
    });
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
