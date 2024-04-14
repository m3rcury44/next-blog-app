'use client';

import styles from './styles.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteComment } from '../model';

const DeleteCommentButton = ({ postId, id }: { postId: string, id: string }) => {

  const queryClient = useQueryClient();

  const { mutate } = useDeleteComment({ postId, queryClient });

  return (
    <button onClick={() => mutate(id)} className={styles.deleteCommentButton}>
      <svg viewBox="0 0 20 20" height="16"
           width="16"
           xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#808080"
          d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
      </svg>
    </button>
  );
};

export default DeleteCommentButton;
