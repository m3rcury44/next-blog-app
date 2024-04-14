import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import EditButton from '@/features/edit-button';
import { getAuthSession } from '@/shared/lib';
import { IPost } from '@/shared/types';

const Post = async ({item}: {item: IPost}) => {

  const session = await getAuthSession()

  return (
    <article className={styles.post}>
      {item.image ?
        <div className={styles.postImageContainer}>
          <Image src={item.image} alt={item.slug + ' post image'} width={0} height={320} sizes="100vw"/>
        </div> :
        <div className={styles.postImageContainer}>POST</div>
      }
      <span>{new Date(item.created_at).toDateString()}</span>
      <Link href={`/post/${item.slug}`}>
        <h2>{item.title}</h2>
        <div>
          {session?.user.id === item.authorId && <EditButton slug={item.slug} />}
          <button aria-label="Navigate to post">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Link>
      <p>{item.description}</p>
      <div>
        <span>Leadership</span>
        <span>Management</span>
        <span>Presentation</span>
      </div>
    </article>
  );
};

export default Post;
