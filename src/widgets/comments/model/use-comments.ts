import { useQuery } from '@tanstack/react-query';
import { getCommentsRequest } from '@/shared/lib';

export const useComments = (id: string, page: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => getCommentsRequest(id, page),
  });
}
