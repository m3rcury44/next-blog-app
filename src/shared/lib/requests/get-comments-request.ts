import { IComment } from '@/shared/types';
import { commentService } from '@/shared/services';

interface ICommentsData {
  comments: IComment[];
  count: number;
}

export const getCommentsRequest = async (postId: string, page: string) => {
  const fetchComments = await commentService.getComments({postId, page})
  const commentsData: ICommentsData = await fetchComments.json();

  return commentsData
}
