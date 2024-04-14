import { NextRequest, NextResponse } from 'next/server';
import { prisma, getAuthSession } from '@/shared/lib';
import { commentSchema } from '@/shared/types';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    const validationCommentDataRequest = commentSchema.pick({postId: true, content: true}).safeParse(body)

    if (!validationCommentDataRequest.success) {
      return NextResponse.json(validationCommentDataRequest.error.issues[0], {status: 415})
    }

    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({message: "You are not authorized"}, {status: 401})
    }

    const {data} = validationCommentDataRequest

    if (!data.content) {
      return NextResponse.json({message: "Comment cant be empty."}, {status: 404})
    }

    const newComment = await prisma.comment.create({
      data: {
        authorId: session?.user.id,
        authorName: session?.user.name,
        authorImage: session?.user.image,
        ...data
      }
    })

    const validationComment = commentSchema.safeParse(newComment)

    if (!validationComment.success) {
      return NextResponse.json(validationComment.error.issues[0], {status: 415})
    }

    return NextResponse.json(validationComment.data, {status: 200})
  } catch (err) {
    return NextResponse.json({message: err}, {status: 500})
  }
}
