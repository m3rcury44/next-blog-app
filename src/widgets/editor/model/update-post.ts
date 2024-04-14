import { postService } from '@/shared/services';
import { toast } from 'sonner';
import { revalidateAction } from '@/shared/lib';
import { IPost } from '@/shared/types';

interface IUpdatePost {
  imagePreview: string | null
  post: IPost
  title: string
  desc: string
  content: string
  downloadURL?: string
}

export const updatePost = async ({imagePreview, post, title, desc, content, downloadURL}: IUpdatePost) => {
  const toastId = toast.loading("Post is updating...")

  if (imagePreview !== post.image || title !== post.title || desc !== post.description || content !== post.content) {
    const res = await (await postService.updatePost({
      slug: post.slug, body: {
        title,
        description: desc,
        content: content,
        image: downloadURL ? downloadURL : imagePreview,
      },
    })).json();

    if (res.success) {
      toast.success("Post is updated, redirecting...", {
        id: toastId
      })

      await revalidateAction('/');

      return res.success
    } else {
      toast.error(res.message, {
        id: toastId
      })
      console.warn(res.message)
    }
  } else {
    const errorText = 'You need to change something to update this post'

    toast.error(errorText, {
      id: toastId
    })
    console.warn(errorText);
  }
}
