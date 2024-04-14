import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(30),
  password: z.string().min(6).max(50),
});

type AuthSchemaType = z.infer<typeof authSchema>

export type TAuth = Partial<Pick<AuthSchemaType, 'name'>> & Omit<AuthSchemaType, 'name'> | AuthSchemaType
