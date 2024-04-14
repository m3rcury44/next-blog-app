'use client';

import styles from './styles.module.scss';
import { useComments, usePendingComments } from '../model';
import { Session } from 'next-auth';
import CreateComment from '@/features/create-comment';
import DeleteCommentButton from '@/features/delete-comment-button';
import Pagination from '@/features/pagination';
import Comment from '@/entities/comment';
import { COMMENTS_PER_PAGE } from '@/shared/lib';

interface ICommentsProps {
  page: string;
  id: string;
  session: Session | null;
}

const Comments = ({ page, id, session }: ICommentsProps) => {

  const { data, isLoading } = useComments(id, page);

  const mutations = usePendingComments(id);

  if (isLoading) {
    return;
  }

  const { comments, count } = data!;

  const totalPages = Math.ceil(count / COMMENTS_PER_PAGE);

  const curPage = parseInt(page) || 1

  return (
    <>
      <h2>Comments</h2>
      {session && <CreateComment postId={id} userImage={session?.user.image as null | string} />}
      {count > 0 &&
        <div className={styles.commentsWrapper}>
          {Array.isArray(comments) && comments.map(comment => (
            <Comment key={comment.id} comment={comment}>
              {comment.authorId === session?.user.id ? <DeleteCommentButton postId={id} id={comment.id} /> : ''}
            </Comment>
          ))}
          {mutations.map((pendingComment, i) => (
            <Comment
              style={{ opacity: 0.5 }}
              key={Date.now() + i}
              comment={{
                ...pendingComment,
                authorName: session?.user.name!,
                authorImage: session?.user.image!,
              }}
            />
          ))}
        </div>
      }
      {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={curPage} />}
    </>
  );
};

export default Comments;
