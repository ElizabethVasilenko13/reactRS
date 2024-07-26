import { useTheme } from '@context/ThemeContext';
import classNames from 'classnames';
import styles from './Pagination.module.scss';

type PaginationProps = {
  pageInfo: { page: number; totalPages: number };
  onPageChange: (params: { page: number }) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pageInfo: { page, totalPages }, onPageChange }) => {
  const { theme } = useTheme();
  const handlePageChange = (newPageNum: number) => {
    onPageChange({ page: newPageNum });
  };

  return (
    <div className={classNames(styles.pagination, styles[theme])}>
      <button type="button" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
        &lt;
      </button>
      {page}
      <button type="button" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
