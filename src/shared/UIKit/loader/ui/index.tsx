import styles from './styles.module.scss';
import { FC, HTMLAttributes } from 'react';

const Loader: FC<HTMLAttributes<HTMLSpanElement>> = ({...props}) => {
  return (
    <span {...props} className={styles.loader}></span>
  );
};

export default Loader;
