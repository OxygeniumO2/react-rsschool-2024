'use client';
import { usePathname, useRouter } from 'next/navigation';
import styles from './pagination.module.css';
import { GetCharactersResp } from '../../services/narutoApi';
import { DEFAULT_NUMBER_OF_ITEMS } from '../../constants/constants';

type PaginationProps = {
  charactersData: GetCharactersResp;
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

export const Pagination = ({ charactersData }: PaginationProps) => {
  const { total, pageSize, currentPage } = charactersData;
  const router = useRouter();
  const pathName = usePathname();

  const decodedPathName = decodeURIComponent(pathName);

  const charName = decodedPathName
    .split('=')[1]
    .replace(/"/g, '')
    .split('/')[0];

  const totalPages = Math.ceil(total / pageSize);
  const pagesToShow = 5;

  const pages = generatePageNumbers(totalPages, pagesToShow, currentPage);

  const handlePage = ({ page }: { page: number }) => {
    router.push(`/search/name="${charName}"/${page}`);
  };

  if (totalPages <= 1) {
    return (
      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={() => handlePage({ page: currentPage - 1 })}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button disabled className={styles.paginationBtn}>
          {currentPage}
        </button>
        <button
          className={styles.paginationBtn}
          onClick={() => handlePage({ page: currentPage + 1 })}
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
        onClick={() => handlePage({ page: currentPage - 1 })}
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
            onClick={() => handlePage({ page: page as number })}
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
        onClick={() => handlePage({ page: currentPage + 1 })}
      >
        Next
      </button>
    </div>
  );
};
