import styles from './styles.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, className, ...props}) => {
  return (
    <button {...props} className={className ? `${styles.button} ${className}` : styles.button}>
      {children}
    </button>
  );
};

export default Button;
