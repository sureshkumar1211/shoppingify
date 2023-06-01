import { prisma } from "@/app/lib/prisma";
import NextAuth, { type NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return { status: 404, message: "Invalid credentials" };
        }

        const user: any = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          return { status: 404, message: "User not found" };
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );
        if (isCorrectPassword) {
          return user;
        }
        return { status: 404, message: "Invalid credentials" };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          userId: user.id,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        userId: token?.userId,
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
