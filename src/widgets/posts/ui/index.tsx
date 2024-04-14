import styles from './styles.module.scss';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Sort from '@/features/sort';
import Pagination from '@/features/pagination';
import Post from '@/entities/post';
import { CreatePostButton } from '@/shared/UIKit/buttons';
import { postService } from '@/shared/services';
import { POSTS_PER_PAGE } from '@/shared/lib';
import { IPost, ISearchParams } from '@/shared/types';

interface IPosts {
  posts: IPost[];
  count: number;
}

const Posts = async ({ searchParams }: { searchParams: ISearchParams }) => {

  const fetchPosts = await postService.getPosts({ page: searchParams!.page, search: searchParams!.search });

  const { posts, count }: IPosts = await fetchPosts!.json();

  const totalPages = Math.ceil((count || 1) / POSTS_PER_PAGE);

  posts?.sort((a, b) => {
    if (posts.length > 2) {
      switch (searchParams!.sort) {
        case 'asc':
          return a.views - b.views;
        case 'desc':
          return b.views - a.views;
        default:
          return 0;
      }
    } else return 0;
  });

  const curPage = searchParams?.page ? +searchParams.page : 1;

  if (curPage > totalPages || curPage < 1) {
    redirect(`?page=${1}`);
  }

  return (
    <section className={styles.posts}>
      <div className={styles.postsHeadline}>
        <h2>All blog posts</h2>
        {posts?.length > 2 && <Sort searchParams={searchParams} />}
        <Link href="/create-post">
          <CreatePostButton>
            Create new post
          </CreatePostButton>
        </Link>
      </div>
      {count > 0 &&
        <div className={styles.postsWrapper}>
          {posts?.map(item => (
            <Post key={item.id} item={item} />
          ))}
        </div>
      }
      {totalPages > 1 &&
        <Pagination totalPages={totalPages} currentPage={curPage} sort={searchParams!.sort || 'initial'} />}
    </section>
  );
};

export default Posts;
