import styles from './styles.module.scss';

const Arrow = () => {
  return (
    <svg className={styles.arrow} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8334 10.4998H4.16669M4.16669 10.4998L10 16.3332M4.16669 10.4998L10 4.6665" stroke="#EFEFEF"
            strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Arrow;
