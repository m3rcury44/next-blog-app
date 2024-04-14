import { IPost } from '@/shared/types/post.interface';
import { IUser } from '@/shared/types/user.interface';

export interface ISinglePost {
  post: IPost
  user: IUser
}
