import { useMutationState } from '@tanstack/react-query';
import { IComment } from '@/shared/types';

export const usePendingComments = (id: string) => {
  return useMutationState<IComment>({
    filters: { status: 'pending', mutationKey: [`${id}-pending`] },
    select: mutation => mutation.state.variables as IComment,
  });
}
