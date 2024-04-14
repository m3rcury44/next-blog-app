import styles from './styles.module.scss';
import Search from '@/features/search';
import NavLinks from '@/entities/nav-links';
import BurgerMenu from '@/entities/burger-menu';
import UserInfo from '@/entities/user-info';
import { getAuthSession } from '@/shared/lib';

const Header = async () => {

  const session = await getAuthSession();

  console.log(session);

  return (
    <header className={styles.header}>
      <BurgerMenu session={session} />
      <UserInfo session={session}/>
      <Search/>
      <NavLinks isAuth={Boolean(session?.user)} />
    </header>
  );
};

export default Header;
