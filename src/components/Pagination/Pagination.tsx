import styles from './Pagination.module.scss';

type PaginationProps = {
  onPageChange: (pageNum: number) => void;
  currentPage: number;
  isLastPage: boolean;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, isLastPage }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <button type="button" disabled={currentPage === 1} onClick={handlePreviousPage}>
        &lt;
      </button>
      {currentPage}
      <button type="button" disabled={isLastPage} onClick={handleNextPage}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
