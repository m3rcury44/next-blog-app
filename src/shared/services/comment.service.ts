interface ICRUDComment {
  content: string
  postId: string
}

class CommentService {
  getComments({postId, page, requestConfig}: {postId: string, page: string, requestConfig?: RequestInit}) {
    return fetch(`${process.env.NEXTAUTH_URL || ''}/api/comments/${postId}?page=${page}`, { method: 'GET', ...requestConfig });
  }

  createComment({body, requestConfig}: {body: ICRUDComment, requestConfig?: RequestInit}) {
    return fetch(`${process.env.NEXTAUTH_URL || ''}/api/comments`, { method: 'POST', body: JSON.stringify(body), ...requestConfig });
  }

  deleteComment({id, requestConfig}: {id: string, requestConfig?: RequestInit}) {
    return fetch(`${process.env.NEXTAUTH_URL || ''}/api/comments/${id}`, {method: 'DELETE', ...requestConfig})
  }
}

export default new CommentService()
