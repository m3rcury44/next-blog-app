import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma, COMMENTS_PER_PAGE, isAuthor } from '@/shared/lib';
import { commentSchema } from '@/shared/types';

export const GET = async (req: NextRequest, {params}: {params: {id: string}}) => {
  try {
    const searchParams = req.nextUrl.searchParams

    const page = searchParams.get('page') as string

    const [comments, count] = await prisma.$transaction([
      prisma.comment.findMany({
        where: {postId: params.id},
        take: COMMENTS_PER_PAGE,
        skip: COMMENTS_PER_PAGE * ((parseInt(page) || 1) - 1)
      }),
      prisma.comment.count({where: {postId: params.id}})
    ])

    const validationComment = z.array(commentSchema).safeParse(comments)

    if (!validationComment.success) {
      return NextResponse.json(validationComment.error.issues[0], {status: 415})
    }

    return NextResponse.json({ comments: validationComment.data, count }, {status: 200})
  } catch (err) {
    return NextResponse.json({message: err}, {status: 500})
  }
}

export const DELETE = async (_: any, {params}: {params: {id: string}}) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {id: params.id}
    })

    const validationComment = commentSchema.pick({authorId: true}).safeParse(comment)

    const isCommentAuthor = await isAuthor({validation: validationComment, type: {entity: 'comment', action: 'delete'}})

    if (isCommentAuthor) return isCommentAuthor

    await prisma.comment.delete({
      where: {id: params.id}
    })

    return NextResponse.json({success: true}, {status: 200})
  } catch (err) {
    return NextResponse.json({message: err}, {status: 500})
  }
}
