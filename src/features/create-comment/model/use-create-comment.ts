import { Dispatch, SetStateAction } from 'react';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { commentService } from '@/shared/services';
import { IComment } from '@/shared/types';

interface ICreateComment {
  postId: string;
  content: string;
}

const handleCreateComment = async ({ postId, content }: ICreateComment) => {
  try {
    if (!content) {
      return;
    }

    const response = await commentService.createComment({
      body: {
        content: content,
        postId: postId,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

interface IUseCreateComment extends Pick<IComment, 'postId'> {
  queryClient: QueryClient;
  setValue: Dispatch<SetStateAction<string>>;
}

export const useCreateComment = ({ queryClient, postId, setValue }: IUseCreateComment) => {
  return useMutation({
    mutationKey: [`${postId}-pending`],
    mutationFn: handleCreateComment,
    onSuccess: async () => {
      setValue('');
      await queryClient.invalidateQueries({ queryKey: [postId] });
    }
  });
};
