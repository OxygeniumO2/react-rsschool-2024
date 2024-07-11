import styles from './pagination.module.css';
import { GetCharactersResp } from '../../services/narutoApi';

type PaginationProps = {
  charactersData: GetCharactersResp;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  charactersData,
  onPageChange,
}: PaginationProps) => {
  const { total, pageSize, currentPage } = charactersData;

  const totalPages = Math.ceil(total / pageSize);
  const pagesToShow = 5;

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= pagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  if (totalPages <= 1) {
    return (
      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={styles.paginationBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={total < 6}
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationBtn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {pages.map((page, index) => {
        if (page === '...') {
          return <span key={index}>...</span>;
        }
        return (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={currentPage === page ? `${styles.currentPage}` : ''}
            disabled={currentPage === page}
          >
            {page}
          </button>
        );
      })}
      <button
        className={styles.paginationBtn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
