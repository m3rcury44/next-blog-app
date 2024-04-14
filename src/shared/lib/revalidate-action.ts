'use server'

import { revalidatePath } from 'next/cache';

export const revalidateAction = async (path: string) => {
  'use server'

  revalidatePath(path)
}
