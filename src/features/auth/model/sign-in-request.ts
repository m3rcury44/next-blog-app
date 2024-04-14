import { signIn } from 'next-auth/react';
import { TAuth } from '@/shared/types';

export const signInRequest = async (values: TAuth) => {
  return await signIn('credentials', {
    ...values,
    redirect: false
  })
}
