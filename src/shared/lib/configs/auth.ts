import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import prisma from './connect';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth/next';

export const authConfig: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email' },
        name: { label: 'name', type: 'name' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password && !credentials?.name) return null

        const currentUser = await prisma.user.findFirst({
          where: { email: credentials.email }
        })

        const isExist = await bcrypt.compare(credentials.password, currentUser?.password as string)

        if (currentUser && isExist) {
          const {password, ...userWithoutPassword} = currentUser

          return userWithoutPassword as User
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id!

      return session
    }
  },
  pages: {
    signIn: '/sign-in'
  }
}

export const getAuthSession = () => getServerSession(authConfig)
