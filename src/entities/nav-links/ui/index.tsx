'use client';

import styles from './styles.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SwitchTheme from '@/features/switch-theme';
import LogoutButton from '@/features/logout-button';
import { FC, HTMLAttributes } from 'react';

const authNavLinks = [
  {
    href: '/',
    title: 'blog',
  }
];

const notAuthNavLinks = [
  ...authNavLinks,
  {
    href: '/sign-in',
    title: 'sign in',
  },
  {
    href: '/sign-up',
    title: 'sign up',
  },
];

interface INavLinks extends HTMLAttributes<HTMLElement> {
  isAuth: boolean
}

const NavLinks: FC<INavLinks> = ({ children, isAuth }) => {

  const pathname = usePathname();

  return (
    <nav className={styles.navLinks}>
      {children}
      <ul>
        {isAuth ?
          <>
            {authNavLinks.map((item, i) => {

              const isActive = pathname === item.href;

              return (
                <li key={i} className={isActive ? styles.navActive : ''}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              );
            })}
            <li>
              <LogoutButton />
            </li>
          </> :
          <>
            {notAuthNavLinks.map((item, i) => {

              const isActive = pathname === item.href;

              return (
                <li key={i} className={isActive ? styles.navActive : ''}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              )
            })}
          </>
        }
        <SwitchTheme />
      </ul>
    </nav>
  );
};

export default NavLinks;
