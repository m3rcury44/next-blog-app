import { toast } from 'sonner';
import { postService } from '@/shared/services';
import { revalidateAction } from '@/shared/lib';

interface ICreatePost {
  title: string
  desc: string
  content: string
  downloadURL?: string
}

export const createPost = async ({ title, desc, content, downloadURL }: ICreatePost) => {
  try {
    const toastId = toast.loading("Post is creating...")

    if (title && content && desc) {
      const res = await (await postService.createPost({
        body: {
          title,
          description: desc,
          content: content,
          image: downloadURL,
        },
      })).json();

      if (res.success) {
        toast.success("Post is created, redirecting...", {
          id: toastId
        })

        await revalidateAction('/');

        return res.slug
      } else {
        toast.error(res.message, {
          id: toastId
        })
        console.warn(res)
      }
    } else {
      const errorText = 'You need to fill all required fields'

      toast.error(errorText, {
        id: toastId
      })
      console.warn(errorText);
    }

  } catch (err) {
    console.error(err);
  }
}
