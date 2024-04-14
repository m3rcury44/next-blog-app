import { z } from 'zod';

export const commentSchema = z.object({
  id: z.string().cuid(),
  authorId: z.string(),
  authorName: z.string(),
  authorImage: z.string().nullable(),
  postId: z.string(),
  content: z.string(),
  created_at: z.date()
})

export interface IComment extends z.infer<typeof commentSchema> {}
