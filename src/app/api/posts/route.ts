import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma, POSTS_PER_PAGE, getAuthSession } from '@/shared/lib';
import { postSchema } from '@/shared/types';

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const page = searchParams.get('page') as string;
    const search = (searchParams.get('search') || '') as string;

    const searchCondition = {
      where: {
        title: { contains: search },
      },
    };

    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POSTS_PER_PAGE,
        skip: POSTS_PER_PAGE * ((parseInt(page) || 1) - 1),
        ...searchCondition
      }),
      prisma.post.count(searchCondition),
    ]);

    const validationPosts = z.array(postSchema).safeParse(posts)

    if (!validationPosts.success) {
      return NextResponse.json(validationPosts.error.issues[0], {status: 415})
    }

    return NextResponse.json({ posts: validationPosts.data, count }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const validationPostDataRequest = postSchema.pick({title: true, description: true, content: true, image: true}).safeParse(body)

    if (!validationPostDataRequest.success) {
      return NextResponse.json(validationPostDataRequest.error.issues[0], {status: 415})
    }

    const session = await getAuthSession();

    const slug = `${session?.user.name}-${validationPostDataRequest.data.title}`.toLowerCase().replace(/[^a-z0-9\-]/g, '-');

    const isPostSlugExist = await prisma.post.findUnique({
      where: { slug },
    });

    if (isPostSlugExist) {
      return NextResponse.json({ message: 'You already have a post with that title' });
    }

    const newPost = await prisma.post.create({
      data: {
        authorId: session?.user?.id as string,
        slug,
        ...validationPostDataRequest.data
      },
    });

    const validationPost = postSchema.safeParse(newPost)

    if (!validationPost.success) {
      return NextResponse.json(validationPost.error.issues[0], {status: 415})
    }

    return NextResponse.json({ success: true, slug: validationPost.data.slug }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
