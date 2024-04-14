import { z } from 'zod';

export const postSchema = z.object({
  id: z.string().cuid(),
  authorId: z.string(),
  slug: z.string(),
  title: z.string().max(40),
  description: z.string().max(150),
  content: z.string().max(10000),
  image: z.string().nullable().optional(),
  views: z.number(),
  created_at: z.date(),
  updated_at: z.date()
})

export interface IPost extends z.infer<typeof postSchema> {}
