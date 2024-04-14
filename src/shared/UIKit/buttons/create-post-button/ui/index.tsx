import styles from './styles.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';
import { Button } from '../../';

const CreatePostButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
  return (
    <Button {...props} className={styles.createPostButton}>
      <p>{children}</p>
    </Button>
  );
};

export default CreatePostButton;
