import { z } from 'zod';
import { authSchema } from './auth.interface';

export const userDataSchema = authSchema.omit({ password: true }).extend({
  id: z.string().cuid(),
  image: z.string().nullable(),
});

export interface IUser extends z.infer<typeof userDataSchema> {}
