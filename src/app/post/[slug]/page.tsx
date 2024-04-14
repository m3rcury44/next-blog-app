import {Suspense} from "react";
import {redirect} from 'next/navigation';
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import SinglePost from '@/widgets/single-post';
import Comments from '@/widgets/comments';
import BackButton from "@/features/back-button";
import {postService} from '@/shared/services';
import {getAuthSession, getCommentsRequest} from '@/shared/lib';
import {ISearchParams, ISinglePost} from '@/shared/types';
import Loader from "@/shared/UIKit/loader";

interface IPostProps {
    searchParams: ISearchParams
    params: { slug: string }
}

export async function generateMetadata({params}: Pick<IPostProps, 'params'>) {
    const fetchPost = await postService.getPost({slug: params.slug})
    const {post}: ISinglePost = await fetchPost.json()

    return {
        title: post.title,
        description: post.description
    }
}

const Post = async ({searchParams, params}: IPostProps) => {

    const queryClient = new QueryClient()

    const fetchPost = await postService.getPost({slug: params.slug, requestConfig: {cache: "no-cache"}})

    if (!fetchPost.ok) {
        redirect('/')
    }

    const singlePostData: ISinglePost = await fetchPost.json()

    const {page} = searchParams

    await queryClient.prefetchQuery({
        queryKey: [singlePostData.post.id],
        queryFn: () => getCommentsRequest(singlePostData.post.id, page)
    })

    const session = await getAuthSession()

    return (
        <>
            <BackButton />
            <Suspense fallback={<div style={{display: 'grid', placeItems: 'center', height: '100%'}}><Loader/></div>}>
                <SinglePost searchParams={searchParams} singlePostData={singlePostData}>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <Comments page={page} id={singlePostData.post.id} session={session}/>
                    </HydrationBoundary>
                </SinglePost>
            </Suspense>
        </>
    );
};

export default Post;
