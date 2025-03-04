import NextAuth, {CredentialsSignin} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { username, password } = credentials;
        if(username === 'test' && password === 'test'){
          return {
            email: 'test',
            nickname: '여울',
            image: '/images/user/profile.png'
          }
        }
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});