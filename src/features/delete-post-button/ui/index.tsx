"use client"

import styles from './styles.module.scss';
import { FC, HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { postService } from '@/shared/services';
import { revalidateAction } from '@/shared/lib';

interface IDeletePostButton extends HTMLAttributes<HTMLButtonElement> {
  slug: string
}

const DeletePostButton: FC<IDeletePostButton> = ({slug, ...props}) => {

  const router = useRouter()

  const handleDeletePost = async () => {
    await postService.deletePost({ slug })
    await revalidateAction('/')

    router.push('/')
  }

  return (
    <button {...props} onClick={handleDeletePost} className={styles.deletePostButton}>
      <p>Delete post</p>
    </button>
  );
};

export default DeletePostButton;
