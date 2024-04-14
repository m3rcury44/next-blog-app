import { IPost } from '@/shared/types';

interface ICRUDPost extends Pick<IPost, 'content' | 'title' | 'description' | 'image'> {
}

class PostService {
  getPosts({ page, search, requestConfig }: { page: string, search: string, requestConfig?: RequestInit }) {
    return fetch(`${process.env.NEXTAUTH_URL || ''}/api/posts?page=${page}&search=${search || ''}`, { method: 'GET', ...requestConfig });
  }

  getPost({ slug, requestConfig }: { slug: string, requestConfig?: RequestInit }) {
    return fetch(`${process.env.NEXTAUTH_URL || ''}/api/posts/${slug}`, { method: 'GET', ...requestConfig });
  }

  createPost({ body, requestConfig }: { body: ICRUDPost, requestConfig?: RequestInit }) {
    return fetch(`${process.env.NEXTAUTH_URL || ''}/api/posts`, { method: 'POST', body: JSON.stringify(body), ...requestConfig });
  }

  updatePost({ slug, body, requestConfig }: { slug: string, body: ICRUDPost, requestConfig?: RequestInit }) {
    return fetch(`${process.env.NEXTAUTH_URL || ''}/api/posts/${slug}`, {
      method: 'PATCH',
      body: JSON.stringify(body), ...requestConfig,
    });
  }

  deletePost({ slug, requestConfig }: { slug: string, requestConfig?: RequestInit }) {
    return fetch(`${process.env.NEXTAUTH_URL || ''}/api/posts/${slug}`, { method: 'DELETE', ...requestConfig });
  }
}

export default new PostService();
