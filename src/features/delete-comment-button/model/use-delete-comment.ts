import { QueryClient, useMutation } from '@tanstack/react-query';
import { commentService } from '@/shared/services';

const handleDeleteComment = async (id: string) => {
  try {
    await commentService.deleteComment({id})
  } catch (err) {
    console.error(err);
  }
}

interface IUseDeleteComment {
  queryClient: QueryClient
  postId: string
}

export const useDeleteComment = ({ queryClient, postId }: IUseDeleteComment) => {
  return useMutation({
    mutationFn: handleDeleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [postId]})
    }
  })
}
