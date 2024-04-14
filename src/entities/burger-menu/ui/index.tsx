'use client';

import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import { Session } from 'next-auth';
import { useOutsideClick } from '@/shared/lib/hooks';
import NavLinks from '@/entities/nav-links';
import UserInfo from '@/entities/user-info';

const BurgerMenu = ({ session }: { session: Session | null }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isFadeMounted, setIsFadeMounted] = useState(false);
  const burgerMenuRef = useRef<HTMLElement>(null);

  const handleOpenMenu = () => {
    setIsFadeMounted(prevState => !prevState);

    if (!isOpen) setIsOpen(true);
  };

  useOutsideClick(isOpen, setIsFadeMounted, burgerMenuRef);

  return (
    <>
      <button onClick={handleOpenMenu} aria-checked={isFadeMounted} className={styles.burgerMenuButton}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen &&
        <div
          className={isFadeMounted ? `${styles.burgerMenu} ${styles.fadeIn}` : `${styles.burgerMenu} ${styles.fadeOut}`}
          onAnimationEnd={() => {
            if (!isFadeMounted) setIsOpen(false);
          }}>
          <aside ref={burgerMenuRef}>
            <NavLinks isAuth={Boolean(session?.user)}>
              <UserInfo session={session}/>
            </NavLinks>
          </aside>
        </div>
      }
    </>
  );
};

export default BurgerMenu;
