import styles from './styles.module.scss';
import { AvatarIcon } from '../../../app/assets/images/'
import { FC, HTMLAttributes } from 'react';
import Image from 'next/image';
import { IComment } from '@/shared/types';

interface ICommentProps extends HTMLAttributes<HTMLElement> {
  comment: IComment
}

const Comment: FC<ICommentProps> = ({children, comment, ...props}) => {
  return (
    <article {...props} className={styles.comment}>
      <Image src={comment.authorImage || AvatarIcon} alt="avatar" height={40} width={40}/>
      <div>
        <h3>{comment.authorName}</h3>
        <p>{comment.content}</p>
      </div>
      {children}
    </article>
  );
};

export default Comment;
