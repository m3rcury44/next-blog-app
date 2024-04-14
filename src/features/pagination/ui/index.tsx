'use client';

import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import Arrow from '@/shared/UIKit/arrow';

interface IPagination {
  totalPages: number;
  currentPage: number;
  sort?: string
}

const Pagination = ({ totalPages, currentPage, sort }: IPagination) => {

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const router = useRouter();

  const navigateToPage = (page: number) => {
    if (sort) {
      router.replace(`?page=${page}&sort=${sort}`, { scroll: false });
    } else {
      router.replace(`?page=${page}`, { scroll: false });
    }
  };

  const diff = totalPages - currentPage + 1;

  const arr = new Array(totalPages >= 7 ? 7 : totalPages).fill(undefined);

  return (
    <div className={styles.pagination}>
      <button disabled={!hasPrev} onClick={() => navigateToPage(currentPage - 1)}>
        <Arrow />
        <p>Previous</p>
      </button>
      <div>
        {currentPage > 6 ? diff > 7 ?
            <>
              <button onClick={() => navigateToPage(1)}>1</button>
              <span>...</span>
              {arr.map((_, i) => (
                <button key={i} className={currentPage + i === currentPage ? styles.activeBtn : ''}
                        onClick={() => navigateToPage(currentPage + i)}>{currentPage + i}</button>
              ))}
              <span>...</span>
            </> :
            <>
              <button onClick={() => navigateToPage(1)}>1</button>
              <span>...</span>
              {arr.map((_, i) => (
                <button key={i} className={totalPages - i === currentPage ? styles.activeBtn : ''}
                        onClick={() => navigateToPage(totalPages - i)}>{totalPages - i}</button>
              )).reverse()}
            </> :
          <>
            {arr.map((_, i) => (
              <button key={i} className={i + 1 === currentPage ? styles.activeBtn : ''}
                      onClick={() => navigateToPage(i + 1)}>{i + 1}</button>
            ))}
            {totalPages > 7 && <span>...</span>}
          </>
        }
      </div>
      <button disabled={!hasNext} onClick={() => navigateToPage(currentPage + 1)}>
        <p>Next</p>
        <Arrow />
      </button>
    </div>
  );
};

export default Pagination;
