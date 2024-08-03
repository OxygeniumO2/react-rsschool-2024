import styles from './pagination.module.css';
import { GetCharactersResp } from '../../services/narutoApi';
import { DEFAULT_NUMBER_OF_ITEMS } from '../../constants/constants';

type PaginationProps = {
  charactersData: GetCharactersResp;
  onPageChange: ({ page }: { page: number }) => void;
};

export const generatePageNumbers = (
  totalPages: number,
  pagesToShow: number,
  currentPage: number
) => {
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

export const Pagination = ({
  charactersData,
  onPageChange,
}: PaginationProps) => {
  const { total, pageSize, currentPage } = charactersData;

  const totalPages = Math.ceil(total / pageSize);
  const pagesToShow = 5;

  const pages = generatePageNumbers(totalPages, pagesToShow, currentPage);

  if (totalPages <= 1) {
    return (
      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={() => onPageChange({ page: currentPage - 1 })}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button disabled className={styles.paginationBtn}>
          {currentPage}
        </button>
        <button
          className={styles.paginationBtn}
          onClick={() => onPageChange({ page: currentPage + 1 })}
          disabled={total < DEFAULT_NUMBER_OF_ITEMS}
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
        onClick={() => onPageChange({ page: currentPage - 1 })}
      >
        Prev
      </button>
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span className={styles.dots} key={index}>
              ...
            </span>
          );
        }
        return (
          <button
            key={index}
            onClick={() => onPageChange({ page: page as number })}
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
        onClick={() => onPageChange({ page: currentPage + 1 })}
      >
        Next
      </button>
    </div>
  );
};
