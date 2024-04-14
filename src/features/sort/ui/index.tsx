'use client';

import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOutsideClick } from '@/shared/lib/hooks';
import { ISearchParams } from '@/shared/types';

const Sort = ({ searchParams }: { searchParams: ISearchParams }) => {

  const page = searchParams.page || 1;
  const search = searchParams.search || '';
  const sort = searchParams.sort || '';

  const [isFadeMounted, setIsFadeMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sortState, setSortState] = useState(sort)

  const sortRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleOpenSort = () => {
    setIsFadeMounted(prevState => !prevState);

    if (!isOpen) setIsOpen(true);
  };

  const handleSetSort = (sort: 'asc' | 'desc') => {
    handleOpenSort();

    setSortState(sort)
    router.replace(`?page=${page}&sort=${sort}&search=${search}`, { scroll: false });
  };

  const handleResetSort = () => {
    setSortState('')
    router.replace(`?page=${page}&search=${search}`, {scroll: false})
  }

  useOutsideClick(isOpen, setIsFadeMounted, sortRef)

  const sortCondition = Boolean(sortState && sortState !== 'initial')

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sortButtons}>
        <button onClick={handleOpenSort}>
          Sort by: {sortCondition ? sortState === 'asc' ? "Less viewed" : "Most viewed" : ''}
          <svg style={isFadeMounted ? { rotate: '180deg' } : {}} height="24" width="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
               strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"
                fill="#0F0F0F"></path>
            </g>
          </svg>
        </button>
        {sortCondition ? <button onClick={handleResetSort}>reset</button> : ''}
      </div>
      {isOpen &&
        <div className={isFadeMounted ? styles.fadeIn : styles.fadeOut} onAnimationEnd={() => {
          if (!isFadeMounted) setIsOpen(false);
        }}>
          <button onClick={() => handleSetSort('desc')}>Most viewed</button>
          <button onClick={() => handleSetSort('asc')}>Less viewed</button>
        </div>
      }
    </div>
  );
};

export default Sort;
