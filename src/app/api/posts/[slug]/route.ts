import { NextRequest, NextResponse } from 'next/server';
import { prisma, isAuthor } from '@/shared/lib';
import { postSchema, userDataSchema } from '@/shared/types';

export const GET = async (_: any, { params }: { params: { slug: string } }) => {
  try {
    const { slug } = params;

    const post = await prisma.post.update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const validationPost = postSchema.safeParse(post);

    if (!validationPost.success) {
      return NextResponse.json(validationPost.error.issues[0], { status: 415 });
    }

    const user = await prisma.user.findUnique({
      where: { id: post.authorId },
      select: {
        name: true,
        image: true,
      },
    });

    const validationUserData = userDataSchema.pick({ name: true, image: true }).safeParse(user);

    if (!validationUserData.success) {
      return NextResponse.json(validationUserData.error.issues[0], { status: 415 });
    }

    return NextResponse.json({ post: validationPost.data, user: validationUserData.data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};

const isPostAuthor = async ({ slug, action }: { slug: string, action: string }) => {
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    select: { authorId: true },
  });

  const validationPost = postSchema.pick({ authorId: true }).safeParse(post);

  return await isAuthor({ validation: validationPost, type: { entity: 'post', action: action } });
};

export const DELETE = async (_: any, { params }: { params: { slug: string } }) => {
  try {
    console.log(params);

    const isAuthor = await isPostAuthor({ slug: params.slug, action: 'delete' });

    if (isAuthor) return isAuthor

    await prisma.post.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    const body = await req.json();

    const validationPostDataRequest = postSchema.pick({
      title: true,
      description: true,
      content: true,
      image: true,
    }).safeParse(body);

    if (!validationPostDataRequest.success) {
      return NextResponse.json(validationPostDataRequest.error.issues[0], { status: 415 });
    }

    const isAuthor = await isPostAuthor({ slug: params.slug, action: 'edit' });

    if (isAuthor) return isAuthor

    await prisma.post.update({
      where: { slug: params.slug },
      data: body,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
