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
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/test`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          })
  
          if (!authResponse.ok) {
              throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
            }
  
          const user = await authResponse.json();
          console.log('user', user);
          return {
            email: user.id,
            name: user.nickname,
            image: user.image,
            ...user,
          }
        } catch(error){
          console.error('로그인 실패:', error);
          throw new Error('로그인 요청 중 오류가 발생했습니다.');
        }
      },
    }),
  ]
});