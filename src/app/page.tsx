import Posts from '@/widgets/posts';
import BlogGreetings from '@/entities/blog-greetings';
import { ISearchParams } from '@/shared/types';

const Home = ({ searchParams }: { searchParams: ISearchParams }) => {
  return (
    <>
      <BlogGreetings />
      <Posts searchParams={searchParams} />
    </>
  );
};

export default Home;
