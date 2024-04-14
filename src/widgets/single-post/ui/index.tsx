import styles from './styles.module.scss';
import { AvatarIcon } from '../../../app/assets/images';
import { FC, HTMLAttributes } from 'react';
import Image from 'next/image';
import DeletePostButton from '@/features/delete-post-button';
import EditButton from '@/features/edit-button';
import MarkdownContent from '@/entities/markdown-content';
import { getAuthSession } from '@/shared/lib';
import { ISearchParams, ISinglePost } from '@/shared/types';

interface ISinglePostProps extends HTMLAttributes<HTMLElement> {
  searchParams: ISearchParams;
  singlePostData: ISinglePost;
}

const SinglePost: FC<ISinglePostProps> = async ({ children, singlePostData }) => {

  const { post, user } = singlePostData;

  const session = await getAuthSession();

  return (
    <section className={styles.singlePost}>
      <div className={styles.authorInfo}>
        <Image src={user.image || AvatarIcon} alt={user.name} height={40} width={40} />
        <div>
          <h3>{user.name}</h3>
          <time>{new Date(post.created_at).toLocaleDateString()}</time>
        </div>
      </div>
      <div className={styles.singlePostHeadline}>
        <h1>{post.title}</h1>
        <div>
          <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
               stroke="#808080"><g
            id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                                          strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle
            cx="12" cy="12" r="3.5" stroke="#808080"></circle> <path
            d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"
            stroke="#808080"></path> </g></svg>
          Views: {post.views}
        </span>
          {session?.user.id === post.authorId &&
            <div>
              <EditButton slug={post.slug} />
              <DeletePostButton slug={post.slug} />
            </div>
          }
        </div>
      </div>
      <span>{post.description}</span>
      {post.image &&
        <Image
          src={post.image}
          alt={post.slug + ' post image'}
          width={0}
          height={556}
          sizes="100vw"
          priority
        />
      }
      <MarkdownContent>
        {post.content}
      </MarkdownContent>
      {children}
    </section>
  );
};

export default SinglePost;
