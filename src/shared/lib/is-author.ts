import { SafeParseReturnType } from 'zod';
import { getAuthSession } from '@/shared/lib/configs/auth';
import { NextResponse } from 'next/server';

interface IIsAuthor {
  validation: SafeParseReturnType<{ authorId: string }, { authorId: string }>
  type: { entity: string, action: string }
}

export const isAuthor = async ({ validation, type }: IIsAuthor) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: 'You are not authorized' }, { status: 401 });
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.issues[0], { status: 415 });
  }

  if (validation.data.authorId !== session?.user.id) {
    return NextResponse.json({ message: `You dont have access to ${type.action} this ${type.entity}` }, { status: 403 });
  }
};
