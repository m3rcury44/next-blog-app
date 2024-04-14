import { TAuth } from '@/shared/types';

class UserService {
  register({body, requestConfig}: {body: TAuth, requestConfig?: RequestInit}) {
    return fetch(`${process.env.NEXTAUTH_URL || ''}/api/users/register`, { body: JSON.stringify(body), method: 'POST', ...requestConfig })
  }
}

export default new UserService()
