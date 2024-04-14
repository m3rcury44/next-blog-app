import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module "next-auth" {
  interface Session {
    user: {
      name: string
      email?: string
      image?: string | null
      picture?: string
      id: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string
    email?: string
    sub?: string
    picture?: string
    id?: string
  }
}
