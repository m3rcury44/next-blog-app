import { signIn } from 'next-auth/react';
import { userService } from '@/shared/services';
import { TAuth } from '@/shared/types';

export const signUpRequest = async (values: TAuth) => {
  const response = await userService.register({body: values})

  if (response.ok) {
    return await signIn('credentials', {
      ...values,
      redirect: false
    })
  } else {
    return await response.json()
  }
}
