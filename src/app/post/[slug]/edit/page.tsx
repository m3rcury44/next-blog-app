import { redirect } from 'next/navigation';
import Editor from '@/widgets/editor';
import BackButton from '@/features/back-button';
import {postService} from '@/shared/services';
import { getAuthSession } from '@/shared/lib';
import { ISinglePost } from '@/shared/types';

export async function generateMetadata({params}: {params: {slug: string}}) {
  const fetchPost = await postService.getPost({slug: params.slug})
  const { post }: ISinglePost = await fetchPost.json()

  return {
    title: post.title,
    description: post.description
  }
}

const EditPost = async ({params}: {params: {slug: string}}) => {

  const fetchPost = await postService.getPost({ slug: params.slug, requestConfig: {cache: 'no-cache'} })
  const { post }: ISinglePost = await fetchPost.json()

  const session = await getAuthSession()

  if (session?.user.id !== post.authorId) {
    redirect('/')
  }

  return (
    <>
      <BackButton/>
      <Editor post={post} />
    </>
  );
};

export default EditPost;
