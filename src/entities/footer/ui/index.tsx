import styles from './styles.module.scss';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>© 2024</li>
        <li>
          <Link href="https://github.com/m3rcury44" target="_blank">GitHub</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
