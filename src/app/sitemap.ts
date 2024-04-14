import { prisma } from '@/shared/lib';

export default async function sitemap() {
  const posts = await prisma.post.findMany()

  const allPosts = posts.map(post => ({
    url: `${process.env.NEXTAUTH_URL}/post/${post.slug}`,
    lastModified: new Date(post.updated_at).toISOString()
  }))

  const routes = ['', '/sign-in', '/sign-up'].map(route => ({
    url: `${process.env.NEXTAUTH_URL}${route}`,
    lastModified: new Date().toISOString()
  }))

  return [...routes, ...allPosts]
}
