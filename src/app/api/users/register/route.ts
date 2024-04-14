import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/shared/lib';
import { authSchema, userDataSchema } from '@/shared/types';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const validationUserDataRequest = authSchema.safeParse(body);

    if (!validationUserDataRequest.success) {
      return NextResponse.json(validationUserDataRequest.error.issues[0], { status: 415 });
    }

    const { email, password, name } = validationUserDataRequest.data;

    const existUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existUser) {
      return NextResponse.json({ message: 'This user already exist' }, { status: 404 });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPass,
      },
    });

    const { password: userPass, ...userData } = user;

    const validationUserData = userDataSchema.safeParse(userData);

    if (!validationUserData.success) {
      return NextResponse.json(validationUserData.error.issues[0], { status: 415 });
    }

    return NextResponse.json({ success: validationUserData.success }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 501 });
  }
};
